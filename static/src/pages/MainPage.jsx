import React, {useEffect, useState} from 'react';
import {Autocomplete, Button, Container, TextField} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {getWeekType} from '../utils/weekUtils';
import {getGroupSchedule, getTeachers, getTeacherSchedule} from '../api/api';

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
                console.log(processedTeachers)

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

    const handleTeacherSelect = async (event, value) => {
        if (value) {
            const encodedTeacherName = encodeURIComponent(value);
            // Редирект на страницу преподавателя
            navigate(`/teacher/${encodedTeacherName}`); // Передаем имя преподавателя в URL
            console.log(value);
            const scheduleData = await getTeacherSchedule(encodedTeacherName);
        }
    };

    return (
        <div style={styles.container}>
            <Container style={styles.content}>
                {/* Заголовок */}
                <div style={styles.header}>
                    <h1>Расписание {userData ? `для ${userData.group} - ${userData.subgroup} подгруппа` : ''}</h1>
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
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e0c3fc, #8ec5fc)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
    },
    content: {
        width: '100%',
        maxWidth: '1200px',
        background: '#fff',
        borderRadius: '15px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        overflow: 'hidden',
    },
    header: {
        background: '#6200ea',
        padding: '20px',
        color: '#fff',
    },
    title: {
        margin: 0,
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 600,
    },
    schedule: {
        padding: '20px',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
    },
    dayBlock: {
        background: '#f8f9fa',
        borderRadius: '10px',
        padding: '15px',
        boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s',
    },
    dayBlockHover: {
        transform: 'scale(1.05)',
    },
    dayTitle: {
        fontFamily: "'Poppins', sans-serif",
        marginBottom: '10px',
        color: '#333',
    },
    daySchedule: {
        fontSize: '0.9rem',
        lineHeight: '1.5',
    },
    buttonContainer: {
        position: 'absolute',
        top: '20px',
        right: '20px',
        display: 'flex',
        gap: '10px',
    },
    searchField: {
        width: '300px',
    },
    button: {
        padding: '10px 20px',
    },
};

export default MainPage;
