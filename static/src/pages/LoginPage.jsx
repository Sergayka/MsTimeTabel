import React, { useState } from 'react';
import { Button, TextField, Container, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/api'; // Импортируем функцию login

const LoginPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault(); // Предотвращаем стандартное поведение формы

        // Устанавливаем состояние загрузки
        setLoading(true);
        setError(''); // Очищаем предыдущие ошибки

        try {
            // Отправка POST-запроса на бэкенд
            await login(username, password); // Вызов функции из api.js

            // Перенаправляем на главную страницу после успешной авторизации
            navigate('/');
        } catch (err) {
            // Обработка ошибки
            console.error('Ошибка при авторизации:', err);
            setError('Неверный логин или пароль');
        } finally {
            // Убираем состояние загрузки
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <Container style={styles.formContainer}>
                <h1 style={styles.header}>ЕДИНАЯ СЛУЖБА WEB АУТЕНТИФИКАЦИИ</h1>
                <form style={styles.form} onSubmit={handleLogin}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <p style={styles.error}>{error}</p>}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={styles.button}
                        disabled={loading} // Отключаем кнопку, если идет загрузка
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Войти'}
                    </Button>
                </form>
            </Container>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#001f3d', // Темно-синий фон
        color: 'white', // Белый цвет для текста
    },
    formContainer: {
        width: '100%',
        maxWidth: '400px',
        padding: '30px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Полупрозрачный фон для формы
        borderRadius: '8px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
    },
    header: {
        textAlign: 'center',
        marginBottom: '20px',
        fontSize: '1.5rem',
        fontWeight: 'bold',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    button: {
        marginTop: '20px',
        padding: '10px',
        fontSize: '1.1rem',
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginTop: '10px',
    },
};

export default LoginPage;