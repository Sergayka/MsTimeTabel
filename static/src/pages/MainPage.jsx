import React, { useState, useEffect } from 'react';
import { Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Загружаем сохраненные данные из localStorage
        const savedData = JSON.parse(localStorage.getItem('userData'));
        setUserData(savedData);
    }, []);

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
                        <div style={styles.dayBlock}>
                            <div style={styles.dayTitle}>Понедельник</div>
                            <div style={styles.daySchedule}>Занятие 1</div>
                            <div style={styles.daySchedule}>Занятие 2</div>
                        </div>

                        <div style={styles.dayBlock}>
                            <div style={styles.dayTitle}>Вторник</div>
                            <div style={styles.daySchedule}>Занятие 1</div>
                            <div style={styles.daySchedule}>Занятие 2</div>
                        </div>

                        <div style={styles.dayBlock}>
                            <div style={styles.dayTitle}>Среда</div>
                            <div style={styles.daySchedule}>Занятие 1</div>
                            <div style={styles.daySchedule}>Занятие 2</div>
                        </div>

                        <div style={styles.dayBlock}>
                            <div style={styles.dayTitle}>Четверг</div>
                            <div style={styles.daySchedule}>Занятие 1</div>
                            <div style={styles.daySchedule}>Занятие 2</div>
                        </div>

                        <div style={styles.dayBlock}>
                            <div style={styles.dayTitle}>Пятница</div>
                            <div style={styles.daySchedule}>Занятие 1</div>
                            <div style={styles.daySchedule}>Занятие 2</div>
                        </div>

                        <div style={styles.dayBlock}>
                            <div style={styles.dayTitle}>Суббота</div>
                            <div style={styles.daySchedule}>Занятие 1</div>
                            <div style={styles.daySchedule}>Занятие 2</div>
                        </div>
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
        position: 'relative', // Устанавливаем контейнер как относительный для позиционирования кнопок
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
        gridTemplateColumns: 'repeat(6, 1fr)', // 6 равных колонок
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
        height: '300px', // Высота блока с расписанием
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
        position: 'absolute', // Фиксируем кнопки
        top: '20px',
        right: '20px',
        display: 'flex',
        flexDirection: 'row', // Параллельное расположение кнопок
        gap: '10px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '1rem',
    },
};

export default MainPage;
