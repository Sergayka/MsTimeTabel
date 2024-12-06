package main

import (
	"log"
	"mstimetable/internal/app"
	"mstimetable/internal/config"
)

func main() {
	app := &app.Api{}

	config := config.GetConfigYAML()

	log.Println("version: ", config.APIVersion)
	app.Init(config)

	log.Printf("Server started on %s\n", config.Server.Address)
	app.Run(config.Server.Port)
}
