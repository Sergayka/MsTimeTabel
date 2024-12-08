import axios from 'axios';

// Создаем экземпляр axios с базовым URL
const api = axios.create({
    baseURL: 'http://localhost:3000/api', // Указываем базовый URL
});

// Функция для получения списка групп
export const getGroups = async () => {
    try {
        const response = await api.get('/groups');
        return response.data;
    } catch (error) {
        console.error('Ошибка при загрузке групп:', error);
        throw error;
    }
};

// Функция для авторизации пользователя
export const login = async (username, password) => {
    try {
        const response = await api.post('/login', {
            username,
            password,
        });
        return response.data; // Возвращаем данные, если авторизация успешна
    } catch (error) {
        console.error('Ошибка при авторизации:', error);
        throw new Error('Неверный логин или пароль');
    }
};

// Другие API функции (например, для сохранения данных профиля) можно добавить здесь
