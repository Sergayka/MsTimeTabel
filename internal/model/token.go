package model

import (
	"github.com/dgrijalva/jwt-go"
)

// Claims model
type Claims struct {
	Email string `json:"email"`
	Role  int    `json:"role"`
	jwt.StandardClaims
}
