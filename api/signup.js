const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

// Initialize SQLite database (use /tmp directory on Vercel for ephemeral storage)
const db = new sqlite3.Database('/tmp/signup.db', (err) => {
  if (err) {
    console.error('Database error:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Initialize the users table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  );
`);

module.exports = (req, res) => {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    // Check if username already exists in the database
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Database error: ' + err.message });
      }

      if (row) {
        return res.status(400).json({ error: 'Username already exists.' });
      }

      // Hash the password using bcrypt
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          return res.status(500).json({ error: 'Error hashing password: ' + err.message });
        }

        // Insert the new user into the users table
        const stmt = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
        stmt.run(username, hashedPassword, function (err) {
          if (err) {
            return res.status(500).json({ error: 'Error inserting user into database: ' + err.message });
          }

          res.status(201).json({ message: 'User registered successfully!' });
        });
      });
    });
  } else {
    res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }
};
