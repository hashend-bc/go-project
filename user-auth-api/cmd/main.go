package main

import (
	"log"
	"net/http"
	"user-auth-api/handlers"
	"user-auth-api/middleware"
)

func main() {
	mux := http.NewServeMux()

	mux.HandleFunc("/register", handlers.Register)
	mux.HandleFunc("/login", handlers.Login)
	mux.HandleFunc("/protected", middleware.JWTMiddleware(handlers.Protected))

	log.Println("Server running on :8080")
	log.Fatal(http.ListenAndServe(":8080", middleware.CORS(mux)))
}