const sqlite3 = require('sqlite3').verbose();
const bcryptjs = require('bcryptjs');

// Path for SQLite database (using /tmp for temporary storage on Vercel)
const dbPath = '/tmp/signup.db';

// Open SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
    return;
  }
});

module.exports = (req, res) => {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    // Check if the user exists
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
      if (err) {
        console.error('Error querying database:', err.message);
        return res.status(500).json({ error: 'Database error.' });
      }

      if (!row) {
        return res.status(400).json({ error: 'Invalid username or password.' });
      }

      // Compare the password with the hashed password in the database
      bcryptjs.compare(password, row.password, (err, isMatch) => {
        if (err) {
          console.error('Error comparing passwords:', err.message);
          return res.status(500).json({ error: 'Error comparing passwords.' });
        }

        if (!isMatch) {
          return res.status(400).json({ error: 'Invalid username or password.' });
        }

        // User is logged in successfully
        return res.status(200).json({ message: 'Login successful!' });
      });
    });
  } else {
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }
};
