const { Client } = require('pg');
const bcryptjs = require('bcryptjs');

// PostgreSQL database connection using the DATABASE_URL environment variable
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,  // Disable SSL certificate validation (for testing purposes)
  },
});

client.connect((err) => {
  if (err) {
    console.error('Error connecting to PostgreSQL database:', err.message);
    return;
  }
  console.log('Connected to PostgreSQL database.');
});

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    try {
      // Check if the user exists in the database
      const result = await client.query('SELECT * FROM users WHERE username = $1', [username]);

      if (result.rows.length === 0) {
        return res.status(400).json({ error: 'Invalid username or password.' });
      }

      // Compare the password with the hashed password in the database
      const user = result.rows[0];
      const isMatch = await bcryptjs.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid username or password.' });
      }

      // If password matches, return a success message
      return res.status(200).json({ message: 'Login successful!' });

    } catch (err) {
      console.error('Database error:', err.message);
      return res.status(500).json({ error: 'Database error.' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }
};
