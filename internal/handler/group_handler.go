package handler

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"log"
	"mstimetable/internal/model"
	"mstimetable/internal/repository"

	"net/http"
)

// GetGroups -> processes the request for a list of groups
func GetGroups(db *repository.DB, w http.ResponseWriter, r *http.Request) {
	//Get a list of collections = groups
	collections, err := db.ListCollectionNames()
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

// GetGroupSchedule -> обрабатывает запрос для получения расписания группы
func GetGroupSchedule(db *repository.DB, w http.ResponseWriter, r *http.Request) {
	// Получаем имя группы из параметров запроса
	vars := mux.Vars(r) // Получаем все параметры пути
	groupName := vars["groupName"]

	if groupName == "" {
		http.Error(w, "Group name is required", http.StatusBadRequest)
		return
	}
	log.Println("first step")
	log.Println(groupName)
	// Получаем расписание для группы
	schedule, err := db.GetGroupSchedule(groupName)
	if err != nil {
		http.Error(w, fmt.Sprintf("Error retrieving schedule for group: %v", err), http.StatusInternalServerError)
		return
	}

	// Устанавливаем Content-Type в JSON и отправляем расписание
	w.Header().Set("Content-Type", model.ContentTypeJSON)
	err = json.NewEncoder(w).Encode(schedule)
	if err != nil {
		http.Error(w, "Error encoding schedule data", http.StatusInternalServerError)
		return
	}
	log.Println("second step")
}
