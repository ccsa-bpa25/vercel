const express = require('express');
app.use(express.static('public'));
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const cors = require('cors');
// Initialize the Express app
const app = express();
const port = process.env.PORT || 3000;

// Use CORS middleware
app.use(cors());  // Allow CORS for all routes


// Body parser middleware to parse JSON requests
app.use(bodyParser.json());

// Initialize SQLite database (in-memory for simplicity, use a file for persistence)
const db = new sqlite3.Database('./signup.db', (err) => {
  if (err) {
    console.error("Error opening SQLite database:", err);
  } else {
    console.log("SQLite database connected");
  }
});

// Create a "users" table if it doesn't exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )`);
});

// Signup API
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  // Check if username or password are missing
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // Check if user already exists
  db.get('SELECT * FROM users WHERE username = ?', [username], async (err, row) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }

    if (row) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into the database
    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], function(err) {
      if (err) {
        return res.status(500).json({ message: 'Failed to register user' });
      }

      // Send success response
      res.status(201).json({ message: 'User registered successfully' });
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
