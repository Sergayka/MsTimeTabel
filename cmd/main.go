package main

import (
	"github.com/gin-gonic/gin"
	"log"
	"mstimetable/internal/config"
)

func main() {
	//// Сервируем статические файлы из папки build
	//fs := http.FileServer(http.Dir("./static/build"))
	//http.Handle("/", fs)
	//
	//log.Println("Starting the server on the port 8080...")
	//err := http.ListenAndServe(":8080", nil)
	//if err != nil {
	//	log.Fatal(err)
	//}
	err := config.LoadConfig()
	if err != nil {
		log.Fatalf("Error loading config: %v", err)
	}

	r := gin.Default()

	r.Static("/static", "./static")

	r.GET("/", func(c *gin.Context) {
		c.File("./static/index.html")
	})

	port := config.AppConfig.ServerPort
	log.Println("Starting server on port " + port)

	if err := r.Run(":" + port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}

//package main
//
//import (
//"github.com/gin-gonic/gin"
//_ "github.com/gin-gonic/gin"
//"log"
//"msauth/internal/config"
//"msauth/internal/handler"
//"msauth/internal/repository"
//)
//
//func main() {
//	// Load .env
//	err := config.LoadConfig()
//	if err != nil {
//		log.Fatalf("Error loading config: %v", err)
//	}
//
//	mongoURI := config.AppConfig.MongoURI
//
//	client := repository.InitMongoDB(mongoURI)
//
//	handler.InitHandler(client)
//	//handler.InitKeycloak()
//
//	r := gin.Default()
//	r.POST("/login", handler.LogInHandler)
//	r.POST("/signup", handler.SignUpHandler)
//
//	// TODO:нужно ли делать какую-то прослойку мидлваре для проверки подленности JWT?
//
//	r.POST("/refresh", handler.RefreshTokenHandler)
//	//r.GET("/login/keycloak", handler.KeycloakLoginHandler) // Новый эндпоинт для Keycloak
//	//r.GET("/openid/callback", handler.KeycloakCallbackHandler)
//
//	r.Static("/static", "./static")
//
//	r.GET("/", func(c *gin.Context) {
//		c.File("./static/index.html")
//	})
//
//	port := config.AppConfig.ServerPort
//	log.Println("Starting server on port " + port)
//
//	if err := r.Run(":" + port); err != nil {
//		log.Fatalf("Failed to start server: %v", err)
//	}
//}
