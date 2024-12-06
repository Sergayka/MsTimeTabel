package model

type Service struct {
	APIVersion string `yaml:"apiVersion"`
	Server     struct {
		Address string `yaml:"address"`
		Host    string `yaml:"host"`
		Port    string `yaml:"port"`
	} `yaml:"server"`
	Mongo struct {
		Address  string `yaml:"address"`
		Host     string `yaml:"host"`
		Port     string `yaml:"port"`
		Username string `yaml:"username"`
		Password string `yaml:"password"`
	} `yaml:"mongo"`
	Files struct {
		Path string `yaml:"path"`
	} `yaml:"files"`
}

const (
	ContentTypeBinary = "application/octet-stream"
	ContentTypeForm   = "application/x-www-form-urlencoded"
	ContentTypeJSON   = "application/json"
	ContentTypeHTML   = "text/html; charset=utf-8"
	ContentTypeText   = "text/plain; charset=utf-8"
)
