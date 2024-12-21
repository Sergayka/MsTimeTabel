package handler

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"mstimetable/internal/model"
	"mstimetable/internal/repository"
	"net/http"
)

// GetTeachers -> processes the request for a list of groups
func GetTeachers(db *repository.DB, w http.ResponseWriter, r *http.Request) {
	//Get a list of collections = teachers
	collections, err := db.ListTeachersName()
	if err != nil {
		http.Error(w, "Error retrieving collections", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", model.ContentTypeJSON)
	err = json.NewEncoder(w).Encode(collections)
	if err != nil {
		http.Error(w, "Error sending data", http.StatusInternalServerError)
		return
	}
}

// GetTeacherSchedule -> обрабатывает запрос для получения расписания преподавателя
func GetTeacherSchedule(db *repository.DB, w http.ResponseWriter, r *http.Request) {
	// Получаем имя группы из параметров запроса
	vars := mux.Vars(r) // Получаем все параметры пути
	teacherFio := vars["teacherFio"]

	if teacherFio == "" {
		http.Error(w, "teacher name is required", http.StatusBadRequest)
		return
	}

	schedule, err := db.GetTeacherSchedule(teacherFio)
	if err != nil {
		http.Error(w, fmt.Sprintf("Error retrieving schedule for group: %v", err), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", model.ContentTypeJSON)
	err = json.NewEncoder(w).Encode(schedule)
	if err != nil {
		http.Error(w, "Error encoding schedule data", http.StatusInternalServerError)
		return
	}
}
