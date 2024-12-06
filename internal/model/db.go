package model

import "go.mongodb.org/mongo-driver/mongo"

type GroupHandler struct {
	db *mongo.Database
}
