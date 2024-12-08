package model

import "go.mongodb.org/mongo-driver/bson/primitive"

// Session model
type Session struct {
	RefreshToken string `bson:"refresh_token" json:"refresh_token"`
	ExpireAt     int64  `bson:"expire_at" json:"expire_at"`
}

// User model
type User struct {
	ID       primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Login    string             `bson:"login" json:"login"`
	Password string             `bson:"password" json:"password"`
	Session  Session            `bson:"session,omitempty" json:"session,omitempty"`
}
