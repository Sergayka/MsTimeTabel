import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const TeacherPage = () => {
    const { teacherName } = useParams(); // Получаем имя преподавателя из URL
    const [teacherData, setTeacherData] = useState(null);
    const [schedule, setSchedule] = useState(null);

    useEffect(() => {
        // Функция для получения расписания преподавателя
        const fetchTeacherSchedule = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/teacher/${teacherName}/schedule`);
                const data = await response.json();
                setTeacherData(data);
                setSchedule(data); // Здесь мы получаем расписание
            } catch (error) {
                console.error('Ошибка при получении расписания преподавателя:', error);
            }
        };

        fetchTeacherSchedule();
    }, [teacherName]);

    const renderSchedule = (weekType) => {
        return (
            <div>
                <h2>{weekType === 'Нечетная неделя' ? 'Нечетная неделя' : 'Четная неделя'}</h2>
                <div style={styles.grid}>
                    {['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'].map((day, index) => (
                        <div key={index} style={styles.dayBlock}>
                            <div style={styles.dayTitle}>{day}</div>
                            <div style={styles.daySchedule}>
                                {schedule && schedule[weekType] && schedule[weekType][day] ? (
                                    Object.keys(schedule[weekType][day]).map((timeSlot, idx) => (
                                        <div key={idx}>
                                            <strong>{timeSlot}:</strong> {schedule[weekType][day][timeSlot] || 'Нет занятий'}
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
        );
    };

    return (
        <div style={styles.container}>
            {teacherData ? (
                <div style={styles.content}>
                    <div style={styles.header}>
                        <h1>{teacherName ? teacherName : 'Неизвестный преподаватель'}</h1>
                    </div>

                    {/* Расписание для нечетной недели */}
                    {renderSchedule('Нечетная неделя')}

                    {/* Расписание для четной недели */}
                    {renderSchedule('Четная неделя')}
                </div>
            ) : (
                <p>Загружаем данные преподавателя...</p>
            )}
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
    dayTitle: {
        fontFamily: "'Poppins', sans-serif",
        marginBottom: '10px',
        color: '#333',
    },
    daySchedule: {
        fontSize: '0.9rem',
        lineHeight: '1.5',
    },
};

export default TeacherPage;
