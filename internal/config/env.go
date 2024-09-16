package config

import (
	"github.com/joho/godotenv"
	"log"
	"mstimetable/internal/model"
	"os"
)

var AppConfig model.Config

// getEnv -> return the value of env variable / default
func getEnv(key, defaultValue string) string {
	if value, exist := os.LookupEnv(key); exist {
		return value
	}

	return defaultValue
}

// LoadConfig -> upload env variables from .env
func LoadConfig() error {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	AppConfig = model.Config{
		MongoURI:      getEnv("MONGO_URI", "mongodb://localhost:27017"),
		MongoUserName: getEnv("MONGO_USERNAME", "admin"),
		MongoPassword: getEnv("MONGO_PASSWORD", "123321"),
		DBName:        getEnv("MONGO_DB", "mstimetable"),
		ServerPort:    getEnv("SERVER_PORT", "8080"),
	}

	//AppConfig = model.Config{
	//	MongoURI:             getEnv("MONGO_URI", "mongodb://localhost:27017"),
	//	MongoUsername:        getEnv("MONGO_USERNAME", ""),
	//	MongoPassword:        getEnv("MONGO_PASSWORD", ""),
	//	DBName:               getEnv("DB_NAME", "msauth"),
	//	DBCollection:         getEnv("DB_COL", "users"),
	//	JWTSecretKey:         getEnv("JWT_SECRET_KEY", "defaultSecret"),
	//	ServerPort:           getEnv("SERVER_PORT", "8080"),
	//	KeycloakURL:          getEnv("KEYCLOAK_URL", "https://kk.vr-protect.ru/realms/master"),
	//	KeycloakClientID:     getEnv("KEYCLOAK_CLIENT_ID", "https://kk.vr-protect.ru/realms/master"),
	//	KeycloakClientSecret: getEnv("KEYCLOAK_CLIENT_SECRET", "KAnoIbc372WYLnuWMaqpXNmiEs6giAru"),
	//	KeycloakRedirectURL:  getEnv("KEYCLOAK_REDIRECT_URL", "http://msauth.loc/openid/callback"),
	//}
	//
	//AppConfig.LifetimeRefreshTokenDays, _ = strconv.Atoi(getEnv("LIFETIME_REFRESH_TOKEN_DAYS", "30"))
	//AppConfig.LifetimeAccessTokenMin, _ = strconv.Atoi(getEnv("LIFETIME_ACCESS_TOKEN_MIN", "15"))

	return nil
}
