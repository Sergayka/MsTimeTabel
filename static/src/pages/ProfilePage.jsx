import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, MenuItem, Select, InputLabel, FormControl, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getGroups } from '../api/api';

const ProfilePage = () => {
    const navigate = useNavigate();
    const [groups, setGroups] = useState([]);
    const [direction, setDirection] = useState('');
    const [group, setGroup] = useState('');
    const [subgroup, setSubgroup] = useState('');

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const data = await getGroups();
                const sortedGroups = data.sort((a, b) => a.localeCompare(b));
                setGroups(sortedGroups);
            } catch (error) {
                console.error('Ошибка при загрузке групп:', error);
            }
        };

        fetchGroups();

        // Загружаем сохраненные данные из localStorage (если есть)
        const savedData = JSON.parse(localStorage.getItem('userData'));
        if (savedData) {
            setDirection(savedData.direction);
            setGroup(savedData.group);
            setSubgroup(savedData.subgroup);
        }
    }, []);

    const handleBack = () => {
        navigate('/');
    };

    const handleSave = () => {
        // Сохраняем данные в localStorage
        const userData = {
            direction,
            group,
            subgroup,
            timestamp: new Date().getTime(), // Сохраняем метку времени
        };
        localStorage.setItem('userData', JSON.stringify(userData));

        alert('Данные сохранены!');
    };

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <IconButton onClick={handleBack} style={styles.backButton}>
                    <ArrowBackIcon />
                </IconButton>
                <h1 style={styles.title}>Профиль</h1>
            </div>

            <form style={styles.form}>
                <FormControl fullWidth style={styles.formControl}>
                    <InputLabel>Направление</InputLabel>
                    <Select
                        value={direction}
                        onChange={(e) => setDirection(e.target.value)}
                        label="Направление"
                    >
                        <MenuItem value="МК">МК</MenuItem>
                        <MenuItem value="ИУК">ИУК</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth style={styles.formControl}>
                    <InputLabel>Группа</InputLabel>
                    <Select
                        value={group}
                        onChange={(e) => setGroup(e.target.value)}
                        label="Группа"
                    >
                        {groups.map((groupName, index) => (
                            <MenuItem key={index} value={groupName}>
                                {groupName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth style={styles.formControl}>
                    <InputLabel>Подгруппа</InputLabel>
                    <Select
                        value={subgroup}
                        onChange={(e) => setSubgroup(e.target.value)}
                        label="Подгруппа"
                    >
                        <MenuItem value="I">I</MenuItem>
                        <MenuItem value="II">II</MenuItem>
                        <MenuItem value="III">III</MenuItem>
                    </Select>
                </FormControl>

                <div style={styles.buttonContainer}>
                    <Button variant="contained" color="primary" onClick={handleSave} style={styles.button}>
                        Сохранить данные
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleLoginRedirect}
                        style={styles.button}
                    >
                        Войти через web - bmstu
                    </Button>
                </div>
            </form>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        marginBottom: '20px',
    },
    backButton: {
        marginRight: '20px',
    },
    title: {
        fontSize: '1.8rem',
        color: '#333',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '400px',
    },
    formControl: {
        marginBottom: '20px',
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        marginTop: '20px',
    },
    button: {
        padding: '10px',
        fontSize: '1rem',
    },
};

export default ProfilePage;
