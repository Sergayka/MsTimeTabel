package repository

import (
	"crypto/rand"
	"crypto/sha256"
	"encoding/base64"
	"encoding/hex"
	"strings"
)

// GenerateSalt -> generating salt
func GenerateSalt() (string, error) {
	salt := make([]byte, 16)
	_, err := rand.Read(salt)
	if err != nil {
		return "", err
	}
	return base64.StdEncoding.EncodeToString(salt), nil
}

// HashPassword -> hashing password with sha256 + salt
func HashPassword(password string) (string, error) {
	salt, err := GenerateSalt()
	if err != nil {
		return "", err
	}

	hash := sha256.New()
	hash.Write([]byte(salt + password))
	hashedPassword := hex.EncodeToString(hash.Sum(nil))

	return salt + ":" + hashedPassword, nil
}

// CheckPasswordHash -> checks whether password its hash
func CheckPasswordHash(password, hash string) bool {
	parts := strings.Split(hash, ":")
	if len(parts) != 2 {
		return false
	}
	salt := parts[0]
	hashedPassword := parts[1]

	hashToCompare := sha256.New()
	hashToCompare.Write([]byte(salt + password))

	calculatedHash := hex.EncodeToString(hashToCompare.Sum(nil))
	return calculatedHash == hashedPassword
}
