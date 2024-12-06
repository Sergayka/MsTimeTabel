package repository

import (
	"context"
	"fmt"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
	"mstimetable/internal/model"
)

type DB struct {
	Client       *mongo.Client
	ClientOption *options.ClientOptions
}

func (db *DB) DBConnect(config *model.Service) {
	// Set client options
	log.Println(config.Mongo.Address)
	clientOption := options.Client().ApplyURI(config.Mongo.Address)
	if config.Mongo.Username != "" && config.Mongo.Password != "" {
		clientOption.SetAuth(options.Credential{
			Username: config.Mongo.Username,
			Password: config.Mongo.Password,
		})
	}

	// Connect to MongoDB
	client, err := mongo.Connect(context.TODO(), clientOption)
	if err != nil {
		log.Fatalf("Error connecting to Mongo: %v", err)
	}
	log.Println("Connect to MongoDB: " + config.Mongo.Address + " . . .")

	// Check the connection
	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Fatalf("Error when checking connection with Mongo: %v", err)
	}
	db.Client = client
	db.ClientOption = clientOption
	log.Println("Connected to MongoDB!")
}

// ListCollectionNames возвращает список коллекций из базы данных
func (db *DB) ListCollectionNames() ([]string, error) {
	// Получаем коллекции из базы данных "Schedule"
	collectionNames, err := db.Client.Database("Schedule").ListCollectionNames(context.TODO(), options.ListCollections())
	if err != nil {
		return nil, err
	}
	return collectionNames, nil
}

func (db *DB) Disconnect() {
	err := db.Client.Disconnect(context.TODO())
	if err != nil {
		log.Fatal(err)
	} else {
		fmt.Println("Connection to MongoDB closed.")
	}
}
