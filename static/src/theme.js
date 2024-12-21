import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    colors: {
        brand: {
            100: '#ff63c3',
            200: '#ff3f91',
            300: '#f12472',
        },
    },
    components: {
        Button: {
            baseStyle: {
                fontWeight: 'bold', // Устанавливаем жирный шрифт для всех кнопок
            },
        },
    },
});

export default theme;
