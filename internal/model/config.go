package model

// Config model
type Config struct {
	MongoURI      string `bson:"mongoUri" json:"mongoUri"`
	MongoUserName string `bson:"mongoUserName" json:"mongoUserName"`
	MongoPassword string `bson:"mongoPassword" json:"mongoPassword"`
	DBName        string `bson:"dbName" json:"dbName"`
	ServerPort    string `bson:"serverPort" json:"serverPort"`
}
