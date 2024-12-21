import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Container,
    Heading,
    HStack,
    VStack,
    Grid,
    Text,
    Input,
    InputGroup,
    InputRightElement,
    List,
    ListItem,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { getWeekType } from '../utils/weekUtils';
import { getGroupSchedule, getTeachers } from '../api/api';

const MainPage = () => {
    const [userData, setUserData] = useState(null);
    const [schedule, setSchedule] = useState(null);
    const [teachers, setTeachers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredTeachers, setFilteredTeachers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem('userData'));
        setUserData(savedData);

        const fetchTeachers = async () => {
            try {
                const teachersData = await getTeachers();

                const processedTeachers = teachersData.map((teacher) => {
                    const nameWithoutSchedule = teacher.replace('_schedule', '');
                    const nameWithoutRank = nameWithoutSchedule.split('.').slice(-3);
                    return `${nameWithoutRank[0].split(' ')[0]} ${nameWithoutRank[0].split(' ')[1]}.${nameWithoutRank[1]}.`;
                });

                setTeachers(processedTeachers);
                setFilteredTeachers(processedTeachers);
            } catch (error) {
                console.error('Ошибка при загрузке преподавателей:', error);
            }
        };

        fetchTeachers();
    }, []);

    useEffect(() => {
        if (userData && userData.group) {
            const weekType = getWeekType(new Date());
            fetchSchedule(userData.group, weekType);
        }
    }, [userData]);

    const fetchSchedule = async (groupName, weekType) => {
        try {
            const scheduleData = await getGroupSchedule(groupName, weekType);
            setSchedule(scheduleData);
        } catch (error) {
            console.error('Ошибка при получении расписания:', error);
        }
    };

    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleSearchChange = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        setFilteredTeachers(teachers.filter((teacher) => teacher.toLowerCase().includes(query)));
    };

    const handleTeacherSelect = (teacher) => {
        if (teacher) {
            const encodedTeacherName = encodeURIComponent(teacher);
            navigate(`/teacher/${encodedTeacherName}`);
        }
    };

    return (
        <Box bgGradient="linear(to-r, purple.300, blue.500)" minH="100vh" position="relative">
            {/* Верхний правый угол */}
            <HStack
                position="absolute"
                top="20px"
                right="20px"
                spacing={4}
                alignItems="center"
                zIndex="10"
            >
                {/* Поле для поиска */}
                <InputGroup w="300px" position="relative">
                    <Input
                        placeholder="Поиск преподавателя"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        bg="white"
                    />
                    <InputRightElement>
                        <Button colorScheme="blue" size="sm" right="4px">
                            🔍
                        </Button>
                    </InputRightElement>

                    {/* Выпадающий список преподавателей */}
                    {searchQuery && (
                        <List
                            spacing={2}
                            mt={10}
                            bg="white"
                            position="absolute"
                            zIndex="10"
                            maxH="200px"
                            overflowY="auto"
                            boxShadow="md"
                            w="100%"
                            borderRadius="md"
                        >
                            {filteredTeachers.map((teacher, index) => (
                                <ListItem
                                    key={index}
                                    cursor="pointer"
                                    _hover={{ bg: 'gray.100' }}
                                    onClick={() => handleTeacherSelect(teacher)}
                                >
                                    {teacher}
                                </ListItem>
                            ))}
                        </List>
                    )}
                </InputGroup>

                {/* Кнопка профиля */}
                <Button colorScheme="purple" onClick={() => handleNavigate('/profile')}>
                    Профиль
                </Button>
            </HStack>

            {/* Основной контент */}
            <Container maxW="2000" pt={20}>
                {/* Заголовок */}
                <Heading as="h1" size="lg" mb={6} textAlign="center" color="purple.700">
                    Расписание {userData ? `для ${userData.group} - ${userData.subgroup} подгруппа` : ''}
                </Heading>

                {/* Дни недели по горизонтали */}
                <HStack
                    spacing={6}
                    overflowX="auto"
                    py={4}
                    px={2}
                    align="start" // Выравнивание по верхнему краю
                >
                    {['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'].map((day, index) => (
                        <Box
                            key={index}
                            bg="gray.100"
                            borderRadius="md"
                            p={6}
                            minW="200px"
                            minH="300px" // Фиксированная высота для всех дней
                            boxShadow="md"
                            _hover={{ bg: 'purple.50', transform: 'scale(1.05)', transition: 'all 0.2s' }}
                        >
                            <Heading as="h3" size="sm" mb={4} color="purple.600" textAlign="center">
                                {day}
                            </Heading>
                            <VStack align="start" spacing={3}>
                                {schedule && schedule[day] ? (
                                    Object.keys(schedule[day]).map((timeSlot, idx) => (
                                        <Box key={idx}>
                                            <Text fontWeight="bold">{timeSlot}:</Text> {schedule[day][timeSlot] || 'Нет занятий'}
                                        </Box>
                                    ))
                                ) : (
                                    <Text>Нет данных для {day}</Text>
                                )}
                            </VStack>
                        </Box>
                    ))}
                </HStack>
            </Container>
        </Box>
    );
};

export default MainPage;
