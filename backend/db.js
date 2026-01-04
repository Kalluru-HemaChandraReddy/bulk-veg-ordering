const sqlite3 = require("sqlite3").verbose()
const path = require("path")
const fs = require("fs")

// ✅ Render persistent disk path
const dbDir =
  process.env.NODE_ENV === "production"
    ? "/var/data"
    : path.join(__dirname, "db")

// ✅ Ensure directory exists
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true })
}

const dbPath = path.join(dbDir, "database.sqlite")

const db = new sqlite3.Database(dbPath, err => {
  if (err) {
    console.error("Database connection failed", err)
  } else {
    console.log("Connected to SQLite database")
  }
})

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      price REAL NOT NULL,
      image TEXT,
      available INTEGER DEFAULT 1
    )
  `)

  db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      buyerName TEXT,
      productName TEXT,
      quantity INTEGER,
      address TEXT,
      status TEXT DEFAULT 'Pending'
    )
  `)
})

module.exports = db
