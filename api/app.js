const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();

module.exports = async (req, res) => {
  // Ensure the correct HTTP method is used
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // Check if username or password are missing
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Initialize SQLite database (Vercel uses a temporary filesystem)
    const db = new sqlite3.Database('/tmp/signup.db', (err) => {
      if (err) {
        console.error("Error opening SQLite database:", err);
        return res.status(500).json({ message: 'Database error' });
      }
    });

    // Create a "users" table if it doesn't exist
    db.serialize(() => {
      db.run(`CREATE TABLE IF NOT EXISTS users (
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      )`);
    });

    // Check if the user already exists
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
      db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], function (err) {
        if (err) {
          return res.status(500).json({ message: 'Failed to register user' });
        }

        // Send success response
        return res.status(201).json({ message: 'User registered successfully' });
      });
    });

    db.close();
  } else {
    // If the request method is not POST, return Method Not Allowed
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
};
