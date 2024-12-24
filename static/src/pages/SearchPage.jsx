import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const SearchPage = () => {
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        // Загружаем расписание с API
        axios.get('http://localhost:8080/api/schedule')
            .then(response => setSchedule(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>Расписание</h1>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>День недели</TableCell>
                            <TableCell>Предмет</TableCell>
                            <TableCell>Время</TableCell>
                            <TableCell>Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {schedule.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.day}</TableCell>
                                <TableCell>{item.subject}</TableCell>
                                <TableCell>{item.time}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary">Редактировать</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant="contained" color="primary" href="/add">Добавить занятие</Button>
        </div>
    );
};

export default SearchPage;
