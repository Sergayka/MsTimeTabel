# Строим этап для компиляции
FROM golang:1.20-alpine AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Установка зависимостей
RUN apk update && apk add --no-cache git

# Копируем go.mod и go.sum для зависимости
COPY go.mod go.sum ./

# Скачиваем зависимости
RUN go mod download

# Копируем остальные файлы
COPY . .

# Компилируем бинарный файл
RUN go build -o main ./cmd/main.go

# Финальный контейнер
FROM alpine:latest

WORKDIR /root/

# Копируем скомпилированное приложение
COPY --from=build /app/main .

# Экспонируем порт
EXPOSE 8080

# Запуск приложения
CMD ["./main"]
