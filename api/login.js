const sqlite3 = require('sqlite3').verbose();
const bcryptjs = require('bcryptjs');

// Initialize SQLite database (use /tmp for a writable temporary file in Vercel)
const db = new sqlite3.Database('/tmp/signup.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
    return;
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Initialize users table if it doesn't exist
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
      console.error('Username and password are required.');
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    // Check if the user exists in the database
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
      if (err) {
        console.error('Database error when checking user:', err.message);
        return res.status(500).json({ error: 'Database error when checking user.' });
      }

      if (!row) {
        console.error('User not found:', username);
        return res.status(400).json({ error: 'Invalid username or password.' });
      }

      // Compare the provided password with the stored hashed password
      bcryptjs.compare(password, row.password, (err, isMatch) => {
        if (err) {
          console.error('Error comparing passwords:', err.message);
          return res.status(500).json({ error: 'Error comparing passwords.' });
        }

        if (!isMatch) {
          console.error('Invalid password for user:', username);
          return res.status(400).json({ error: 'Invalid username or password.' });
        }

        // Successful login
        console.log('User logged in successfully:', username);
        return res.status(200).json({ message: 'Login successful!' });
      });
    });
  } else {
    // Method not allowed
    console.error('Invalid HTTP method:', req.method);
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }
};
