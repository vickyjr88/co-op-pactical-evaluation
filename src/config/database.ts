import sqlite3 from "sqlite3";

// Connect to SQLite database
const db: sqlite3.Database = new sqlite3.Database("database.db", (err) => {
  console.log("Connected to the database");
});

// Create tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        username TEXT UNIQUE,
        password TEXT,
        name TEXT,
        balance REAL DEFAULT 0
    )`);

  db.run(`CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY,
        userId INTEGER,
        amount REAL,
        category TEXT,
        type TEXT, -- 'income' or 'expense'
        date TEXT
    )`);

  db.run(`CREATE TABLE IF NOT EXISTS goals (
        id INTEGER PRIMARY KEY,
        userId INTEGER,
        goalName TEXT,
        targetAmount REAL,
        currentAmount REAL DEFAULT 0,
        deadline TEXT
    )`);
});

export default db;
