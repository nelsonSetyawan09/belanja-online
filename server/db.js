import Database from "better-sqlite3";

export const db = new Database("dev.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS carts (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    product_id TEXT,
    quantity INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
  );
`);

// CREATE TABLE IF NOT EXISTS users (
//   id TEXT PRIMARY KEY,
//   email TEXT UNIQUE,
//   password TEXT,
//   created_at DATETIME DEFAULT CURRENT_TIMESTAMP
// );

// CREATE TABLE IF NOT EXISTS products (
//   id TEXT PRIMARY KEY,
//   title TEXT NOT NULL,
//   description TEXT,
//   image TEXT,
//   category TEXT,
//   price INTEGER NOT NULL,
//   created_at DATETIME DEFAULT CURRENT_TIMESTAMP
// );
