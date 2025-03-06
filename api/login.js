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
      // Check if the username exists
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('id, username, password')
        .eq('username', username)
        .single();

      if (!user || userError) {
        return res.status(400).json({ error: 'Invalid username or password.' });
      }

      // Compare the provided password with the stored password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid username or password.' });
      }

      // Generate a JWT token
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Send a success response with token
      return res.status(200).json({ message: 'Login successful!', token });

    } catch (err) {
      console.error('Error:', err.message);
      return res.status(500).json({ error: 'Internal Server Error.' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }
};
