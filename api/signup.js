const { Client } = require('pg');
const bcrypt = require('bcryptjs');
const fs = require('fs');

// PostgreSQL database connection with SSL/TLS enabled
const client = new Client({
  connectionString: process.env.DATABASE_URL,  // Connection string stored in environment variables
  ssl: {
    rejectUnauthorized: false,  // Disable SSL certificate validation (use with caution)
    // If you have specific certificates, you can add them here (for example):
    // ca: fs.readFileSync('/path/to/server.crt').toString(),
    // key: fs.readFileSync('/path/to/client.key').toString(),
    // cert: fs.readFileSync('/path/to/client.crt').toString(),
  },
});

client.connect((err) => {
  if (err) {
    console.error('Error connecting to PostgreSQL database:', err.message);
    return;
  } else {
    console.log('Connected to PostgreSQL database with SSL.');
  }
});

// Initialize the users table (if it doesn't exist)
const initializeDatabase = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `;

  try {
    await client.query(createTableQuery);
    console.log('Users table initialized successfully.');
  } catch (err) {
    console.error('Error creating users table:', err.message);
  }
};

initializeDatabase();

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // Validate that username and password are provided
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    try {
      // Check if the user already exists in the database
      const result = await client.query('SELECT * FROM users WHERE username = $1', [username]);

      if (result.rows.length > 0) {
        return res.status(400).json({ error: 'Username already exists.' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert new user into the database
      const insertQuery = 'INSERT INTO users (username, password) VALUES ($1, $2)';
      await client.query(insertQuery, [username, hashedPassword]);

      // Send a success response
      return res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
      console.error('Database error:', err.message);
      return res.status(500).json({ error: 'Database error.' });
    }
  } else {
    // Method not allowed
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }
};
