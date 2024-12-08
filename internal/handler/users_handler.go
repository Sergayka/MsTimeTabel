package handler

import (
	"encoding/json"
	"mstimetable/internal/model"
	"mstimetable/internal/repository"
	"net/http"
)

// LogIn -> обрабатывает запрос на регистрацию пользователя
func LogIn(db *repository.DB, w http.ResponseWriter, r *http.Request) {
	// Чтение данных из тела запроса
	var user model.User
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	if user.Login == "" || user.Password == "" {
		user.Login = "guest"
		user.Password = "changeMe"
	}

	// Валидация данных
	//if user.Login == "" || user.Password == "" {
	//	http.Error(w, "Login and password are required", http.StatusBadRequest)
	//	return
	//}

	// Создание пользователя
	if err := db.CreateUser(&user); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Ответ
	w.WriteHeader(http.StatusCreated)
	w.Header().Set("Content-Type", model.ContentTypeJSON)
	err := json.NewEncoder(w).Encode(map[string]string{"message": "User created successfully"})
	if err != nil {
		http.Error(w, "Error sending data", http.StatusInternalServerError)
		return
	}
}
