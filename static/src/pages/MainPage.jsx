import React, {useEffect, useState} from 'react';
import {Autocomplete, Button, Container, TextField} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {getWeekType} from '../utils/weekUtils';
import {getGroupSchedule, getTeachers} from '../api/api';

const MainPage = () => {
    const [userData, setUserData] = useState(null);
    const [schedule, setSchedule] = useState(null);
    const [teachers, setTeachers] = useState([]); // Данные преподавателей
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem('userData'));
        setUserData(savedData);

        const fetchTeachers = async () => {
            try {
                const teachersData = await getTeachers();

                const processedTeachers = teachersData.map(teacher => {
                    const nameWithoutSchedule = teacher.replace('_schedule', ''); // Убираем "_schedule"

                    const nameWithoutRank = nameWithoutSchedule.split('.').slice(-3);
                    return `${nameWithoutRank[0].split(' ')[0]} ${nameWithoutRank[0].split(' ')[1]}.${nameWithoutRank[1]}.`;
                });

                setTeachers(processedTeachers);
            } catch (error) {
                console.error('Ошибка при загрузке преподавателей:', error);
            }
        };

        fetchTeachers();
    }, []);

    useEffect(() => {
        if (userData && userData.group) {
            const weekType = getWeekType(new Date());
            fetchSchedule(userData.group, weekType);
        }
    }, [userData]);

    const fetchSchedule = async (groupName, weekType) => {
        try {
            const scheduleData = await getGroupSchedule(groupName, weekType);
            setSchedule(scheduleData);
        } catch (error) {
            console.error('Ошибка при получении расписания:', error);
        }
    };

    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleSearchChange = (event, value) => {
        setSearchQuery(value); // Обновляем значение при изменении в поле поиска
    };

    const handleTeacherSelect = (event, value) => {
        if (value) {
            // Редирект на страницу преподавателя
            navigate(`/teacher/${value}`); // Передаем имя преподавателя в URL
        }
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
                    <div style={styles.grid}>
                        {['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'].map((day, index) => (
                            <div key={index} style={styles.dayBlock}>
                                <div style={styles.dayTitle}>{day}</div>
                                <div style={styles.daySchedule}>
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

            {/* Кнопки и поиск в правом верхнем углу */}
            <div style={styles.buttonContainer}>
                {/* Поиск преподавателя */}
                <Autocomplete
                    freeSolo
                    options={teachers.filter(teacher =>
                        teacher.toLowerCase().includes(searchQuery.toLowerCase()) // Фильтрация по введенному запросу
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Поиск преподавателя"
                            variant="outlined"
                            onChange={(e) => setSearchQuery(e.target.value)} // Обновляем поисковый запрос
                            style={styles.searchField}
                        />
                    )}
                    onChange={handleTeacherSelect} // Обработка выбора преподавателя
                    getOptionLabel={(option) => option}  // Указываем как отображать элементы списка
                    renderOption={(props, option, state) => (
                        <li {...props} key={`${option}-${state.index}`}>{option}</li> // Уникальный key через индекс
                    )}
                />

                {/* Кнопка профиля */}
                <Button variant="contained" color="primary" onClick={() => handleNavigate('/profile')} style={styles.button}>
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
        alignItems: 'center', // Центрируем элементы по вертикали
    },
    searchField: {
        width: '250px', // Ширина поля поиска
        marginRight: '20px', // Отступ между полем поиска и кнопкой профиля
    },
    button: {
        padding: '10px 20px',
        fontSize: '1rem',
    },
};

export default MainPage;
