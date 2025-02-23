const bcrypt = require('bcrypt');
const { db } = require('./initializeDb');  // Reuse the db initialization from initializeDb.js

module.exports = (req, res) => {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    // Check if the user exists in the database
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Database error: ' + err.message });
      }

      // If user doesn't exist, return an error
      if (!row) {
        return res.status(400).json({ error: 'Invalid username or password.' });
      }

      // Compare the password with the stored hash
      bcrypt.compare(password, row.password, (err, isMatch) => {
        if (err) {
          return res.status(500).json({ error: 'Error comparing passwords: ' + err.message });
        }

        // If passwords match, return success
        if (isMatch) {
          res.status(200).json({ message: 'Login successful!' });
        } else {
          // If passwords don't match
          res.status(400).json({ error: 'Invalid username or password.' });
        }
      });
    });
  } else {
    res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }
};
