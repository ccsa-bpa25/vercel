module.exports = (req, res) => {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required for signup.' });
    }

    db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Database error: ' + err.message });
      }

      if (row) {
        return res.status(400).json({ error: 'Username already exists.' });
      }

      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          return res.status(500).json({ error: 'Error hashing password: ' + err.message });
        }

        const stmt = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
        stmt.run(username, hashedPassword, function (err) {
          if (err) {
            return res.status(500).json({ error: 'Error inserting user into database: ' + err.message });
          }

          return res.status(201).json({ message: 'User registered successfully!' });
        });
      });
    });
  } else {
    res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }
};
