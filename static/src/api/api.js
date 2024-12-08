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

// Другие API функции (например, для сохранения данных профиля) можно добавить здесь
