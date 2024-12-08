import React, { useState, useEffect } from 'react';
import { Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getWeekType } from '../utils/weekUtils'; // Импортируем функцию для вычисления недели
import { getGroupSchedule } from '../api/api'; // Импортируем функцию для получения расписания

const MainPage = () => {
    const [userData, setUserData] = useState(null); // Данные пользователя из localStorage
    const [schedule, setSchedule] = useState(null); // Расписание для отображения
    const navigate = useNavigate();

    useEffect(() => {
        // Загружаем сохраненные данные пользователя из localStorage
        const savedData = JSON.parse(localStorage.getItem('userData'));
        setUserData(savedData);
    }, []);

    useEffect(() => {
        if (userData && userData.group) {
            // Определяем текущую неделю (четная или нечетная)
            const weekType = getWeekType(new Date()); // Получаем тип недели (четная или нечетная)
            fetchSchedule(userData.group, weekType); // Получаем расписание для текущей группы и недели
        }
    }, [userData]);

    const fetchSchedule = async (groupName, weekType) => {
        try {
            const scheduleData = await getGroupSchedule(groupName, weekType); // Получаем расписание
            setSchedule(scheduleData); // Устанавливаем расписание в state
            // console.log(scheduleData);
        } catch (error) {
            console.error('Ошибка при получении расписания:', error);
        }
    };

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <div style={styles.container}>
            <Container style={styles.content}>
                {/* Заголовок */}
                <div style={styles.header}>
                    <h1>Расписание {userData ? `для ${userData.direction} - ${userData.group} - ${userData.subgroup}` : ''}</h1>
                </div>

                {/* Расписание */}
                <div style={styles.schedule}>
                    {/* Сетка с 6 равномерными блоками */}
                    <div style={styles.grid}>
                        {['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'].map((day, index) => (
                            <div key={index} style={styles.dayBlock}>
                                <div style={styles.dayTitle}>{day}</div>
                                <div style={styles.daySchedule}>
                                    {/* Проверяем, есть ли данные для дня */}
                                    {schedule && schedule[day] ? (
                                        Object.keys(schedule[day]).map((timeSlot, idx) => (
                                            <div key={idx}>
                                                <strong>{timeSlot}:</strong> {schedule[day][timeSlot] || 'Нет занятий'}
                                            </div>
                                        ))
                                    ) : (
                                        <div>Нет данных для {day}</div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>

            {/* Кнопки в правом верхнем углу */}
            <div style={styles.buttonContainer}>
                <Button variant="contained" color="primary" onClick={() => handleNavigate('/search')} style={styles.button}>
                    Поиск по преподавателю
                </Button>
                <Button variant="contained" color="secondary" onClick={() => handleNavigate('/profile')} style={styles.button}>
                    Профиль
                </Button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f1f1f1, #e3e4e8)',
        textAlign: 'center',
        padding: '20px',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '1200px',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    },
    header: {
        marginBottom: '20px',
    },
    schedule: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gap: '20px',
        width: '100%',
        marginBottom: '20px',
    },
    dayBlock: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#f1f1f1',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        height: '300px',
    },
    dayTitle: {
        fontWeight: 'bold',
        fontSize: '1.2rem',
        textAlign: 'center',
    },
    daySchedule: {
        backgroundColor: '#fff',
        marginTop: '10px',
        padding: '10px',
        borderRadius: '8px',
        minHeight: '50px',
        textAlign: 'center',
    },
    buttonContainer: {
        position: 'absolute',
        top: '20px',
        right: '20px',
        display: 'flex',
        flexDirection: 'row',
        gap: '10px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '1rem',
    },
};

export default MainPage;
