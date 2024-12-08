package config

import (
	"gopkg.in/yaml.v3"
	"log"
	"mstimetable/internal/model"
	"os"
	"path/filepath"
)

const configPath = "../mstimetabel/config.yml"

var (
	FilesPath = ""
)

func GetConfigYAML() *model.Service {
	var service model.Service
	filename, err := filepath.Abs(configPath)
	if err != nil {
		panic(err)
	}
	yamlFile, err := os.ReadFile(filename)
	if err != nil {
		panic(err)
	}
	err = yaml.Unmarshal(yamlFile, &service)
	if err != nil {
		panic(err)
	}
	FilesPath = service.Files.Path
	if _, err := os.Stat(FilesPath); os.IsNotExist(err) {
		err := os.Mkdir(FilesPath, 0777)
		if err != nil {
			log.Fatalln("Error creating directory: ", err)
			return nil
		}
	}
	return &service
}
