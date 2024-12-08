import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <div style={styles.container}>
            <div style={styles.content}>
                <h1 style={styles.title}>Добро пожаловать в расписание!</h1>
                <div style={styles.buttonContainer}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleNavigate('/search')}
                        style={styles.button}
                    >
                        Поиск преподавателей
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleNavigate('/profile')}
                        style={styles.button}
                    >
                        Профиль
                    </Button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f1f1f1, #e3e4e8)', // Постельные тона
        backgroundSize: 'cover', // Обеспечивает, чтобы фон не обрезался
        backgroundAttachment: 'fixed', // Фиксирует фон при прокрутке
        textAlign: 'center',
    },
    content: {
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px', // Максимальная ширина для контейнера
        width: '100%',
    },
    title: {
        fontSize: '2rem',
        color: '#333',
        marginBottom: '30px',
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '15px', // Расстояние между кнопками
    },
    button: {
        padding: '10px 20px',
        fontSize: '1.1rem',
    },
};

export default MainPage;
