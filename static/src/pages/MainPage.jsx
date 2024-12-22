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
    useColorMode,
    IconButton,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { getWeekType } from '../utils/weekUtils';
import { getGroupSchedule, getTeachers } from '../api/api';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { WiSnowflakeCold } from 'react-icons/wi'; // Импортируем иконку снежинки

const MainPage = () => {
    const [userData, setUserData] = useState(null);
    const [schedule, setSchedule] = useState(null);
    const [teachers, setTeachers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredTeachers, setFilteredTeachers] = useState([]);
    const [isSnowing, setIsSnowing] = useState(false); // Состояние для снега
    const navigate = useNavigate();
    const { colorMode, toggleColorMode } = useColorMode();

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

        const savedTheme = localStorage.getItem('chakra-ui-color-mode');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
        }

    }, []);

    useEffect(() => {
        if (userData && userData.group) {
            const weekType = getWeekType(new Date());
            fetchSchedule(userData.group, weekType);
        }
    }, [userData]);

    useEffect(() => {
        localStorage.setItem('chakra-ui-color-mode', colorMode);
    }, [colorMode]);

    useEffect(() => {
        if (isSnowing) {
            let snowflakes = [];
            const snowflakeCount = 50;

            for (let i = 0; i < snowflakeCount; i++) {
                const snowflake = document.createElement('div');
                snowflake.textContent = '❄️';
                snowflake.style.position = 'fixed';
                snowflake.style.left = `${Math.random() * 100}%`;
                snowflake.style.top = '-10px';
                snowflake.style.color = 'white'; // Используем белый цвет для снега
                snowflake.style.fontSize = `${Math.random() * 20 + 10}px`;
                snowflake.style.opacity = Math.random() * 0.7 + 0.3;
                snowflake.style.zIndex = '9999'; // Устанавливаем z-index ниже основного контента
                snowflake.style.pointerEvents = 'none'; // Отключаем взаимодействие с снежинками
                snowflake.style.animation = `fall ${Math.random() * 3 + 2}s linear infinite`;
                document.body.appendChild(snowflake);
                snowflakes.push(snowflake);
            }

            return () => {
                snowflakes.forEach(snowflake => {
                    document.body.removeChild(snowflake);
                });
            };
        }
    }, [isSnowing]);

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

    const toggleSnow = () => {
        setIsSnowing(!isSnowing);
    };

    // Добавляем стили для снежинок
    useEffect(() => {
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            @keyframes fall {
                to {
                    transform: translateY(105vh);
                }
            }
        `;
        document.head.appendChild(styleSheet);
        return () => {
            document.head.removeChild(styleSheet);
        };
    }, []);

    return (
        <Box
            bgGradient={colorMode === 'light' ? 'linear(to-r, purple.300, blue.500)' : 'linear(to-r, #2D3748, #1A202C)'}
            minH="100vh"
            position="relative"
        >
            <HStack
                position="absolute"
                top="20px"
                left="20px"
                spacing={4}
                alignItems="center"
                zIndex="10"
            >
                <IconButton
                    icon={<WiSnowflakeCold />}
                    onClick={toggleSnow}
                    aria-label="Снег"
                    colorScheme="purple"
                />
            </HStack>

            {/* Остальной интерфейс */}
            <HStack
                position="absolute"
                top="20px"
                right="20px"
                spacing={4}
                alignItems="center"
                zIndex="10"
            >
                <IconButton
                    icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                    onClick={toggleColorMode}
                    aria-label="Сменить тему"
                    colorScheme="purple"
                />
                <InputGroup w="300px" position="relative">
                    <Input
                        placeholder="Поиск преподавателя"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        bg={colorMode === 'light' ? 'white' : '#2D3748'}
                        color={colorMode === 'light' ? 'black' : 'white'}
                    />
                    <InputRightElement>
                        <Button colorScheme="blue" size="sm" right="4px">
                            🔍
                        </Button>
                    </InputRightElement>

                    {searchQuery && (
                        <List
                            spacing={2}
                            mt={10}
                            bg={colorMode === 'light' ? 'white' : '#2D3748'}
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
                                    _hover={{ bg: colorMode === 'light' ? 'gray.100' : '#4A5568' }}
                                    onClick={() => handleTeacherSelect(teacher)}
                                    color={colorMode === 'light' ? 'black' : 'white'}
                                >
                                    {teacher}
                                </ListItem>
                            ))}
                        </List>
                    )}
                </InputGroup>

                <Button colorScheme="purple" onClick={() => handleNavigate('/profile')}>
                    Профиль
                </Button>
            </HStack>

            <Container maxW="2000" pt={20}>
                <Heading as="h1" size="lg" mb={6} textAlign="center" color={colorMode === 'light' ? 'purple.700' : 'white'}>
                    Расписание {userData ? `для ${userData.group} - ${userData.subgroup} подгруппа` : ''}
                </Heading>

                <HStack
                    spacing={6}
                    overflowX="auto"
                    py={4}
                    px={2}
                    align="start"
                >
                    {['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'].map((day, index) => (
                        <Box
                            key={index}
                            bg={colorMode === 'light' ? 'gray.100' : '#2D3748'}
                            borderRadius="md"
                            p={6}
                            minW="200px"
                            boxShadow="md"
                            _hover={{ bg: colorMode === 'light' ? 'purple.50' : '#4A5568', transform: 'scale(1.05)', transition: 'all 0.2s' }}
                        >
                            <Heading as="h3" size="sm" mb={4} color={colorMode === 'light' ? 'purple.600' : 'white'} textAlign="center">
                                {day}
                            </Heading>
                            <VStack align="start" spacing={3}>
                                {schedule && schedule[day] ? (
                                    Object.keys(schedule[day]).map((timeSlot, idx) => (
                                        <Box key={idx}>
                                            <Text fontWeight="bold" color={colorMode === 'light' ? 'black' : 'white'}>{timeSlot}:</Text>
                                            <Text color={colorMode === 'light' ? 'black' : 'white'}>{schedule[day][timeSlot] || 'Нет занятий'}</Text>
                                        </Box>
                                    ))
                                ) : (
                                    <Text color={colorMode === 'light' ? 'black' : 'white'}>Нет данных для {day}</Text>
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