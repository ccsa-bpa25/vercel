module.exports = (req, res) => {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required for login.' });
    }

    db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Database error: ' + err.message });
      }

      if (!row) {
        return res.status(400).json({ error: 'Invalid username or password.' });
      }

      bcrypt.compare(password, row.password, (err, isMatch) => {
        if (err) {
          return res.status(500).json({ error: 'Error comparing passwords: ' + err.message });
        }

        if (isMatch) {
          return res.status(200).json({ message: 'Login successful!' });
        } else {
          return res.status(400).json({ error: 'Invalid username or password.' });
        }
      });
    });
  } else {
    res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }
};
