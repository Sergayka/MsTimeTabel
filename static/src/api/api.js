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

// Функция для получения расписания по группе
export const getGroupSchedule = async (groupName, weekType) => {
    try {
        const response = await api.get(`/groups/${groupName}/schedule`);
        return response.data[weekType]; // Возвращаем соответствующую неделю (четную или нечетную)
    } catch (error) {
        console.error('Ошибка при получении расписания:', error);
        throw new Error('Не удалось получить расписание');
    }
};
// Другие API функции (например, для сохранения данных профиля) можно добавить здесь
