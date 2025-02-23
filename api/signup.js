const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');

// Open SQLite database (it will be created if it doesn't exist)
const db = new sqlite3.Database('/tmp/signup.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
    return;
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Initialize the users table (if it doesn't exist)
const initializeDatabase = () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `;

  db.run(createTableQuery, (err) => {
    if (err) {
      console.error('Error creating users table:', err.message);
      return;
    } else {
      console.log('Users table initialized successfully.');
    }
  });
};

initializeDatabase();

module.exports = (req, res) => {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // Validate that username and password are provided
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    // Check if the user already exists in the database
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
      if (err) {
        console.error('Database error when checking user:', err.message);
        return res.status(500).json({ error: 'Database error when checking user.' });
      }

      if (row) {
        return res.status(400).json({ error: 'Username already exists.' });
      }

      // Hash the password
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          console.error('Error hashing password:', err.message);
          return res.status(500).json({ error: 'Error hashing password.' });
        }

        // Insert new user into the database
        const stmt = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
        stmt.run(username, hashedPassword, function (err) {
          if (err) {
            console.error('Error inserting user into database:', err.message);
            return res.status(500).json({ error: 'Error inserting user into database.' });
          }

          // Send a success response
          return res.status(201).json({ message: 'User registered successfully!' });
        });
      });
    });
  } else {
    // Method not allowed
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }
};
