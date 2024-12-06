package handler

import (
	"encoding/json"
	"mstimetable/internal/model"
	"mstimetable/internal/repository"

	"net/http"
)

// GetCollections -> processes the request for a list of groups
func GetCollections(db *repository.DB, w http.ResponseWriter, r *http.Request) {
	//Get a list of collections
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
