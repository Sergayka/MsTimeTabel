import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    styles: {
        global: {
            body: {
                fontFamily: "'Poppins', sans-serif", // Устанавливаем шрифт для всего тела страницы
            },
            h1: {
                fontFamily: "'Poppins', sans-serif", // Заголовки h1 с этим шрифтом
            },
            h2: {
                fontFamily: "'Poppins', sans-serif", // Заголовки h2
            },
            h3: {
                fontFamily: "'Poppins', sans-serif", // Заголовки h3
            },
            p: {
                fontFamily: "'Poppins', sans-serif", // Параграфы с этим шрифтом
            },
            button: {
                fontFamily: "'Poppins', sans-serif", // Кнопки с этим шрифтом
            },
        },
    },
});

export default theme;
