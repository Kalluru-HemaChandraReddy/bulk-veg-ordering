const sqlite3 = require("sqlite3").verbose()
const path = require("path")
const fs = require("fs")

// ✅ Ensure db directory exists (RENDER FIX)
const dbDir = path.join(__dirname, "db")
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true })
}

// ✅ SQLite file path
const dbPath = path.join(dbDir, "database.sqlite")

const db = new sqlite3.Database(dbPath, err => {
  if (err) {
    console.error("Database connection failed", err)
  } else {
    console.log("Connected to SQLite database")
  }
})

db.serialize(() => {
  // PRODUCTS TABLE
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

  // ORDERS TABLE
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

  // ⚠️ OPTIONAL: SEED DATA (ONLY FOR DEMO)
  const insert = db.prepare(`
    INSERT INTO products (name, category, price, image, available)
    VALUES (?, ?, ?, ?, ?)
  `)

  const products = [
    ["Tomato", "vegetable", 30, "tomato.avif", 1],
    ["Potato", "vegetable", 25, "potato.avif", 1],
    ["Onion", "vegetable", 40, "onion.avif", 1],
    ["Carrot", "vegetable", 50, "carrot.avif", 1],
    ["Cabbage", "vegetable", 35, "cabbage.avif", 1],
    ["Cauliflower", "vegetable", 45, "cauliflower.avif", 1],

    ["Apple", "fruit", 120, "apple.avif", 1],
    ["Banana", "fruit", 60, "banana.avif", 1],
    ["Orange", "fruit", 80, "orange.avif", 1],
    ["Mango", "fruit", 150, "mango.avif", 0],
    ["Grapes", "fruit", 90, "grapes.avif", 1]
  ]

  products.forEach(p => insert.run(p))
  insert.finalize()
})

module.exports = db
