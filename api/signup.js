const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

// Initialize the SQLite database
const db = new sqlite3.Database('/tmp/database.db');  // Use the `/tmp` directory for Vercel's ephemeral file system

module.exports = (req, res) => {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    // Check if the username already exists in the database
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Database error.' });
      }

      if (row) {
        return res.status(400).json({ error: 'Username already exists.' });
      }

      // Hash the password using bcrypt
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          return res.status(500).json({ error: 'Error hashing password.' });
        }

        // Insert the new user into the users table
        const stmt = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
        stmt.run(username, hashedPassword, function (err) {
          if (err) {
            return res.status(500).json({ error: 'Error inserting user into database.' });
          }

          res.status(201).json({ message: 'User registered successfully!' });
        });
      });
    });
  } else {
    res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }
};
