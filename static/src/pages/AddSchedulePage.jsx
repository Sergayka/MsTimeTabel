import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';

const AddSchedulePage = () => {
    const [day, setDay] = useState('');
    const [subject, setSubject] = useState('');
    const [time, setTime] = useState('');

    const handleSubmit = () => {
        const newSchedule = { day, subject, time };
        axios.post('http://localhost:8080/api/schedule', newSchedule)
            .then(response => {
                alert('Занятие добавлено');
            })
            .catch(error => {
                console.error(error);
                alert('Ошибка при добавлении занятия');
            });
    };

    return (
        <div>
            <h1>Добавить занятие</h1>
            <TextField
                label="День недели"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                fullWidth
            />
            <TextField
                label="Предмет"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                fullWidth
            />
            <TextField
                label="Время"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                fullWidth
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Добавить
            </Button>
        </div>
    );
};

export default AddSchedulePage;
