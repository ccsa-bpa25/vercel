const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Initialize Supabase client with environment variables
const supabase = createClient(
  process.env.SUPABASE_URL, 
  process.env.SUPABASE_KEY
);

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // Validate that username and password are provided
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    try {
      // Check if the username already exists in the PostgreSQL 'users' table
      const { data: existingUser, error: authError } = await supabase
        .from('users')
        .select('username')
        .eq('username', username)
        .single();

      if (existingUser) {
        return res.status(400).json({ error: 'Username already exists.' });
      }

      // Hash the password for PostgreSQL storage
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user data into the PostgreSQL database
      const { data, error: dbError } = await supabase
        .from('users')
        .insert([
          {
            username: username,
            password: hashedPassword,
          },
        ]);

      if (dbError) {
        return res.status(500).json({ error: 'Error inserting user into database.' });
      }

      // Generate a JWT token
      const token = jwt.sign({ userId: data[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Send a success response with token
      return res.status(201).json({ message: 'User registered successfully!', token });

    } catch (err) {
      console.error('Error:', err.message);
      return res.status(500).json({ error: 'Internal Server Error.' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }
};
