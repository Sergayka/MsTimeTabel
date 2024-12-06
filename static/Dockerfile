# Базовый образ для node.js
FROM node:18-alpine AS build

# Рабочая директория
WORKDIR /app

# Копируем зависимости
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы
COPY . .

# Сборка приложения
RUN npm run build

# Финальный этап
FROM nginx:alpine

# Копируем файлы сборки в nginx
COPY --from=build /app/build /usr/share/nginx/html

# Экспонируем порт
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]
