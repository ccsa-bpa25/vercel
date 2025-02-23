const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');

// Open SQLite database (it will be created if it doesn't exist)
const db = new sqlite3.Database('./users.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Initialize the users table (if it doesn't exist)
const initializeDatabase = () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `;
  
  db.run(createTableQuery, (err) => {
    if (err) {
      console.error('Error creating users table:', err.message);
    } else {
      console.log('Users table initialized successfully.');
    }
  });
};

initializeDatabase();

module.exports = (req, res) => {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required for signup.' });
    }

    // Check if the user already exists in the database
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
      if (err) {
        console.error('Database error:', err.message);
        return res.status(500).json({ error: 'Database error: ' + err.message });
      }

      if (row) {
        // If user already exists, send an error response
        return res.status(400).json({ error: 'Username already exists.' });
      }

      // Hash the password before storing it in the database
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          console.error('Error hashing password:', err.message);
          return res.status(500).json({ error: 'Error hashing password: ' + err.message });
        }

        // Insert the new user into the database
        const stmt = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
        stmt.run(username, hashedPassword, function (err) {
          if (err) {
            console.error('Error inserting user:', err.message);
            return res.status(500).json({ error: 'Error inserting user into database: ' + err.message });
          }

          // Return success response in JSON format
          return res.status(201).json({ message: 'User registered successfully!' });
        });
      });
    });
  } else {
    // If method is not POST, return Method Not Allowed error
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }
};
