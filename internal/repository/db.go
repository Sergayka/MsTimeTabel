package repository

import (
	"context"
	"errors"
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"golang.org/x/crypto/bcrypt"
	"log"
	"mstimetable/internal/model"
	"strings"
)

type DB struct {
	Client       *mongo.Client
	ClientOption *options.ClientOptions
}

func (db *DB) DBConnect(config *model.Service) {
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
	// Фильтруем коллекцию "Users"
	var filteredCollectionNames []string
	for _, name := range collectionNames {
		if name != "Users" {
			filteredCollectionNames = append(filteredCollectionNames, name)
		}
	}

	return filteredCollectionNames, nil
}

func (db *DB) Disconnect() {
	err := db.Client.Disconnect(context.TODO())
	if err != nil {
		log.Fatal(err)
	} else {
		fmt.Println("Connection to MongoDB closed.")
	}
}

func (db *DB) CreateUser(user *model.User) error {
	// Хешируем пароль
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return fmt.Errorf("error hashing password: %v", err)
	}

	// Обновляем пароль с захешированным значением
	user.Password = string(hashedPassword)

	// Вставляем пользователя в коллекцию Users
	collection := db.Client.Database("Schedule").Collection("Users")
	_, err = collection.InsertOne(context.TODO(), user)
	if err != nil {
		return fmt.Errorf("error inserting user into database: %v", err)
	}

	return nil
}

// GetGroupSchedule -> Получить расписание для группы
func (db *DB) GetGroupSchedule(groupName string) (map[string]interface{}, error) {
	// Получаем коллекцию для группы
	collection := db.Client.Database("Schedule").Collection(groupName)

	// Создаем структуру для хранения расписания
	var schedule map[string]interface{}

	// Выполняем запрос на получение расписания для указанной группы
	err := collection.FindOne(context.TODO(), bson.D{{}}).Decode(&schedule)
	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			return nil, fmt.Errorf("group %s not found", groupName)
		}
		return nil, fmt.Errorf("error retrieving group schedule: %v", err)
	}
	// Возвращаем расписание
	return schedule, nil
}

// ListTeachersName -> возвращает список коллекций из базы данных
func (db *DB) ListTeachersName() ([]string, error) {
	// Получаем коллекции из базы данных "Schedule"
	collectionNames, err := db.Client.Database("Teachers").ListCollectionNames(context.TODO(), options.ListCollections())
	if err != nil {
		return nil, err
	}

	return collectionNames, nil
}

// GetTeacherSchedule -> Получить расписание для преподавателя
func (db *DB) GetTeacherSchedule(teacherFio string) (map[string]interface{}, error) {
	// Получаем коллекцию для группы
	teachersCollections, err := db.ListTeachersName()
	if err != nil {
		return nil, err
	}

	var teacherCollectionName string
	for _, name := range teachersCollections {
		// Преобразуем имя коллекции в формат ФИО
		processedCollectionName := processTeacherName(name)

		// Сравниваем с ФИО преподавателя
		if processedCollectionName == teacherFio {
			if teacherCollectionName != "" {
				return nil, fmt.Errorf("multiple collections found for teacher")
			}
			teacherCollectionName = name
		}
	}

	if teacherCollectionName == "" {
		return nil, fmt.Errorf("teacher not found")
	}

	collection := db.Client.Database("Teachers").Collection(teacherCollectionName)
	// Создаем структуру для хранения расписания
	var schedule map[string]interface{}

	// Выполняем запрос на получение расписания для указанной группы
	err = collection.FindOne(context.TODO(), bson.D{{}}).Decode(&schedule)
	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			return nil, fmt.Errorf("group %s not found", teacherFio)
		}
		return nil, fmt.Errorf("error retrieving group schedule: %v", err)
	}

	// Возвращаем расписание
	return schedule, nil
}

// Преобразует имя коллекции в формат ФИО
func processTeacherName(name string) string {
	// Убираем "_schedule" из имени коллекции
	nameWithoutSchedule := strings.Replace(name, "_schedule", "", 1)

	// Разбиваем имя по точкам и берем последние три части
	nameParts := strings.Split(nameWithoutSchedule, ".")

	teacherFio := fmt.Sprintf("%s %s.%s.",
		strings.Split(nameParts[len(nameParts)-3], " ")[0],
		strings.Split(nameParts[len(nameParts)-3], " ")[1],
		nameParts[len(nameParts)-2])

	return teacherFio
}
