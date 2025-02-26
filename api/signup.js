const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');

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
      // Check if the user already exists in Supabase Auth
      const { data: existingUser, error: authError } = await supabase
        .from('users')
        .select('username')
        .eq('username', username)
        .single();

      if (existingUser) {
        return res.status(400).json({ error: 'Username already exists.' });
      }

      // Create user in Supabase Auth system
      const { user, error: signupError } = await supabase.auth.signUp({
        email: `ravired80@gmail.com`,
        password: password,
      });

      if (signupError) {
        return res.status(400).json({ error: signupError.message });
      }

      // Hash the password (for PostgreSQL storage if needed)
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user data into the PostgreSQL database (additional table in Supabase)
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

      // Send a success response
      return res.status(201).json({ message: 'User registered successfully!', user: data });
    } catch (err) {
      console.error('Error:', err.message);
      return res.status(500).json({ error: 'Internal Server Error.' });
    }
  } else {
    // Method not allowed
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }
};
