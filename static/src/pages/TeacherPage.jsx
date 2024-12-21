import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Container,
    Heading,
    VStack,
    Grid,
    GridItem,
    Text,
    Spinner,
    Button,
    HStack,
    useColorMode,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getWeekType } from '../utils/weekUtils'; // Функция для определения типа недели (чётная/нечётная)

const TeacherPage = () => {
    const { teacherName } = useParams(); // Получаем имя преподавателя из URL
    const navigate = useNavigate();
    const { colorMode } = useColorMode(); // Используем для смены темы
    const [teacherData, setTeacherData] = useState(null);
    const [schedule, setSchedule] = useState(null);
    const [currentWeekType, setCurrentWeekType] = useState(''); // Текущая неделя

    useEffect(() => {
        // Определяем текущую неделю (чётная или нечётная)
        const weekType = getWeekType(new Date());
        setCurrentWeekType(weekType === 'odd' ? 'Нечетная неделя' : 'Четная неделя');

        // Загружаем расписание преподавателя
        const fetchTeacherSchedule = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/teacher/${teacherName}/schedule`);
                const data = await response.json();
                setTeacherData(data);
                setSchedule(data);
            } catch (error) {
                console.error('Ошибка при получении расписания преподавателя:', error);
            }
        };

        fetchTeacherSchedule();
    }, [teacherName]);

    const handleBack = () => {
        navigate('/'); // Возвращаемся на главную страницу
    };

    return (
        <Box
            bgGradient={colorMode === 'light' ? 'linear(to-r, purple.300, blue.500)' : 'linear(to-r, #2D3748, #1A202C)'}
            minH="100vh"
            py={10}
        >
            <Container maxW="container.xl" bg={colorMode === 'light' ? 'white' : '#2D3748'} borderRadius="md" boxShadow="lg" p={6}>
                {teacherData ? (
                    <>
                        {/* Заголовок с кнопкой "Назад" */}
                        <HStack mb={6} justify="space-between" align="center">
                            <Button
                                leftIcon={<ArrowBackIcon />}
                                colorScheme="purple"
                                variant="solid"
                                onClick={handleBack}
                            >
                                Назад
                            </Button>
                            <Heading as="h1" size="lg" color={colorMode === 'light' ? 'purple.700' : 'white'} textAlign="center">
                                Расписание преподавателя: {teacherName || 'Неизвестный преподаватель'}
                            </Heading>
                        </HStack>

                        {/* Тип недели */}
                        <Heading as="h2" size="md" mb={4} textAlign="center" color={colorMode === 'light' ? 'purple.500' : 'white'}>
                            {currentWeekType}
                        </Heading>

                        {/* Расписание */}
                        <Grid templateColumns="repeat(6, 1fr)" gap={4}>
                            {['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'].map((day, index) => (
                                <GridItem
                                    key={index}
                                    bg={colorMode === 'light' ? 'gray.100' : '#4A5568'}
                                    borderRadius="md"
                                    p={4}
                                    boxShadow="md"
                                    _hover={{ transform: 'scale(1.05)', transition: 'all 0.2s' }}
                                >
                                    <Heading as="h3" size="sm" mb={4} color={colorMode === 'light' ? 'purple.600' : 'white'} textAlign="center">
                                        {day}
                                    </Heading>
                                    <VStack align="start" spacing={3}>
                                        {schedule && schedule[currentWeekType] && schedule[currentWeekType][day] ? (
                                            Object.keys(schedule[currentWeekType][day]).map((timeSlot, idx) => (
                                                <Box key={idx}>
                                                    <Text fontWeight="bold" color={colorMode === 'light' ? 'black' : 'white'}>{timeSlot}:</Text>{' '}
                                                    <Text color={colorMode === 'light' ? 'black' : 'white'}>{schedule[currentWeekType][day][timeSlot] || 'Нет занятий'}</Text>
                                                </Box>
                                            ))
                                        ) : (
                                            <Text color={colorMode === 'light' ? 'black' : 'white'}>Нет данных для {day}</Text>
                                        )}
                                    </VStack>
                                </GridItem>
                            ))}
                        </Grid>
                    </>
                ) : (
                    <VStack align="center" justify="center" h="full">
                        <Spinner size="xl" color="purple.500" />
                        <Text mt={4} color={colorMode === 'light' ? 'purple.600' : 'white'}>
                            Загружаем данные преподавателя...
                        </Text>
                    </VStack>
                )}
            </Container>
        </Box>
    );
};

export default TeacherPage;
