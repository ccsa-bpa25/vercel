const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('/tmp/signup.db');

db.serialize(() => {
  // Create users table if it doesn't exist
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);
});

db.close();
