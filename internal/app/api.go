package app

import (
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"log"
	"mstimetable/internal/handler"
	"mstimetable/internal/model"
	"mstimetable/internal/repository"
	"net/http"
)

type Api struct {
	Router *mux.Router
	DB     *repository.DB
}

func (a *Api) Init(config *model.Service) {
	a.DB = &repository.DB{}
	a.DB.DBConnect(config)

	a.Router = mux.NewRouter()

	a.setRouters()
}

func (a *Api) setRouters() {
	api := a.Router.PathPrefix("/api/").Subrouter()
	api.HandleFunc("/groups", a.handleRequest(handler.GetGroups)).Methods("GET")
	api.HandleFunc("/login", a.handleRequest(handler.LogIn)).Methods("POST")
	api.HandleFunc("/groups/{groupName}/schedule", a.handleRequest(handler.GetGroupSchedule)).Methods("GET")
}

func (a *Api) Get(path string, f func(w http.ResponseWriter, r *http.Request)) {
	a.Router.HandleFunc(path, f).Methods("GET")
}

func (a *Api) Post(path string, f func(w http.ResponseWriter, r *http.Request)) {
	a.Router.HandleFunc(path, f).Methods("POST")
}

func (a *Api) Put(path string, f func(w http.ResponseWriter, r *http.Request)) {
	a.Router.HandleFunc(path, f).Methods("PUT")
}

func (a *Api) Delete(path string, f func(w http.ResponseWriter, r *http.Request)) {
	a.Router.HandleFunc(path, f).Methods("DELETE")
}

func (a *Api) Run(host string) {
	headersOk := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"})
	originsOk := handlers.AllowedOrigins([]string{"*"})
	methodsOk := handlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "OPTIONS"})

	log.Fatal(http.ListenAndServe(host, handlers.CORS(originsOk, headersOk, methodsOk)(a.Router)))
}

type RequestHandlerFunction func(db *repository.DB, w http.ResponseWriter, r *http.Request)

func (a *Api) handleRequest(handler RequestHandlerFunction) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		handler(a.DB, w, r)
	}
}
