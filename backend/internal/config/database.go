package config

import (
	"backend/pkg/config"
	"database/sql"

	_ "github.com/mattn/go-sqlite3"
)

var DB *sql.DB

func InitDatabase() *sql.DB {
	cfg := config.DatabaseSqlite()

	db, err := sql.Open("sqlite3", cfg.Path)

	if err != nil {
		panic(err)
	}

	err = db.Ping()
	if err != nil {
		panic(err)
	}
	DB = db
	return db
}
