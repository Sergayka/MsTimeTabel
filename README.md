
# 📚 **Проект Расписание для Студентов**

## Описание
Этот проект представляет собой веб-приложение для управления расписанием студентов. Приложение позволяет пользователям просматривать своё расписание по дням недели, а также переключать отображение для чётной или нечётной недели. Это приложение также включает в себя авторизацию через веб, возможность редактировать свой профиль и многое другое!

## 🔧 **Технологии**
- **Frontend**: React, Material-UI, Axios
- **Backend**: Go (Golang), MongoDB
- **Стили**: CSS Grid, Flexbox
- **Инструменты**: Vite, React Router, Axios
- **Авторизация**: JWT (для входа через веб)

## 💻 **Запуск проекта**

### 1. Клонирование репозитория
Для начала клонируйте репозиторий на ваш локальный компьютер:

```bash
git clone https://github.com/Sergayka/MsTimeTabel.git
```

### 2. Установка зависимостей
Перейдите в директорию проекта и установите все необходимые зависимости:

### 3. Запуск бэкенда

```bash
go run main.go
```
Наш бэкенд находится по адресу [http://localhost:3000](http://localhost:3000).

```bash
cd static
npm install
```

### 4. Запуск проекта
После установки зависимостей запустите локальный сервер разработки:

```bash
npm run dev
```

Теперь проект доступен по адресу [http://localhost:5173](http://localhost:5173).


## 🚀 **Основные особенности**
- **Просмотр расписания**: Возможность увидеть занятия для выбранной группы, с учётом чётной или нечётной недели.
- **Редактирование профиля**: Пользователи могут изменить информацию о своём направлении, группе и подгруппе.
- **Авторизация**: Вход через веб с помощью системы авторизации.
- **Адаптивность**: Приложение полностью адаптивно и поддерживает все современные устройства.

## 📸 **Интерфейс**
![mstimetable.jpg](https://github.com/Sergayka/MsTimeTabel/blob/master/mstimetable.jpg?raw=true)

![mainMenu.png](https://github.com/Sergayka/MsTimeTabel/blob/master/mainMenu.png?raw=true)

![profile.png](https://github.com/Sergayka/MsTimeTabel/blob/master/profile.png?raw=true)

## 😎 **Архитектура проекта MsTimeTable**

Проект представляет собой веб-приложение для расписания студентов с использованием стека Go и MongoDB для бэкенда, а также React для фронтенда.

### 1. cmd/
Содержит точку входа в приложение — файл `main.go`, который запускает сервер.

### 2. internal/
#### 2.1 app/
Содержит логику приложения. Файл `api.go` реализует API-методы для взаимодействия с внешним миром.

#### 2.2 config/
Содержит конфигурационные файлы, в том числе `config.go`, который отвечает за загрузку и обработку конфигурации приложения.

#### 2.3 handler/
Содержит обработчики HTTP-запросов. Здесь находятся файлы, например, `users_handler.go` и `group_handler.go`, которые управляют пользователями и группами.

#### 2.4 model/
Содержит структуры данных, такие как `user.go` для пользователей и `token.go` для токенов. Файл `service.go` содержит бизнес-логику приложения.

#### 2.5 repository/
Содержит репозитории для работы с базой данных и утилитами. Файлы `db.go` и `utils.go` отвечают за взаимодействие с MongoDB и вспомогательные функции.

### 3. static/
Содержит статические файлы фронтенда, включая:
- `node_modules/` — зависимости.
- `public/` — публичные ресурсы.
- `src/` — исходные файлы приложения на React:
    - `api/` — API взаимодействия.
    - `assets/` — статические ресурсы (картинки, иконки и т.д.).
    - `pages/` — страницы приложения, включая страницы для добавления расписания, логина, профиля и расписания.
    - `utils/` — вспомогательные функции, например, `weekUtils.js` для работы с неделями.
    - Основные файлы: `App.jsx`, `index.css`, `App.css` — стили и компоненты React.

### 4. parsingXLS/
Содержит логику для парсинга xlsx-файлов:
- `shedules_jsons/` — директория для сохранения преобразованных JSON-файлов расписания.
- `OurShedule.xlsx` — исходный xlsx-файл с расписанием.
- `main.py` — скрипт для парсинга xlsx в JSON.
- `push_to_db.py` — скрипт для загрузки данных в базу данных.

### 🔥  Проект начинался с разработки этих скриптов для парсинга и подготовки данных, после чего можно было приступать к разработке веб-приложения.🔥


### 5. config.yml
Конфигурационный файл для параметров приложения.

### 6. docker-compose.yml и Dockerfile
Файлы для конфигурации контейнеров Docker, которые используются для развертывания приложения в изолированном окружении.

### 7. go.mod
Файл для управления зависимостями в Go.


## 📚 **Планируемые фичи**
- Добавить возможность редактирования расписания.
- Интеграция с календарём.
- Уведомления о занятиях.

## 🔒 **Лицензия**
Этот проект лицензируется под лицензией MIT. (нет)

## 📞 **Контакты**
Если у вас возникли вопросы, пишите мне в TG: @Sergayka