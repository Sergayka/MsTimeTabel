// src/api/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const getGroups = async () => {
    try {
        const response = await axios.get(`${API_URL}/collections`);
        return response.data; // Список групп (названия коллекций)
    } catch (error) {
        console.error("Error fetching groups", error);
        throw error;
    }
};
