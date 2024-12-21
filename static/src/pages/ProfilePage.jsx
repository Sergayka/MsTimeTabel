import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Select,
    Heading,
    VStack,
    HStack,
    IconButton,
    useToast,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { getGroups } from '../api/api';

const ProfilePage = () => {
    const navigate = useNavigate();
    const [groups, setGroups] = useState([]);
    const [direction, setDirection] = useState('');
    const [group, setGroup] = useState('');
    const [subgroup, setSubgroup] = useState('');
    const toast = useToast();

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

        toast({
            title: 'Данные сохранены!',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
    };

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    return (
        <Box bgGradient="linear(to-r, purple.300, blue.500)" minH="100vh" py={10}>
            <Container maxW="container.sm" bg="white" borderRadius="md" boxShadow="lg" p={6}>
                {/* Header */}
                <HStack mb={6}>
                    <IconButton
                        icon={<ArrowBackIcon />}
                        onClick={handleBack}
                        aria-label="Назад"
                        colorScheme="purple"
                    />
                    <Heading size="lg" color="purple.700">
                        Профиль
                    </Heading>
                </HStack>

                {/* Form */}
                <VStack spacing={4}>
                    {/* Группа */}
                    <FormControl id="group">
                        <FormLabel>Группа</FormLabel>
                        <Select
                            placeholder="Выберите группу"
                            value={group}
                            onChange={(e) => setGroup(e.target.value)}
                        >
                            {groups.map((groupName, index) => (
                                <option key={index} value={groupName}>
                                    {groupName}
                                </option>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Подгруппа */}
                    <FormControl id="subgroup">
                        <FormLabel>Подгруппа</FormLabel>
                        <Select
                            placeholder="Выберите подгруппу"
                            value={subgroup}
                            onChange={(e) => setSubgroup(e.target.value)}
                        >
                            <option value="I">I</option>
                            <option value="II">II</option>
                            <option value="III">III</option>
                        </Select>
                    </FormControl>

                    {/* Buttons */}
                    <VStack spacing={3} mt={6} w="full">
                        <Button colorScheme="purple" w="full" onClick={handleSave}>
                            Сохранить данные
                        </Button>
                        <Button colorScheme="blue" w="full" onClick={handleLoginRedirect}>
                            Войти через web - bmstu
                        </Button>
                    </VStack>
                </VStack>
            </Container>
        </Box>
    );
};

export default ProfilePage;
