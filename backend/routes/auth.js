const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Helper to validate email format
const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide all required fields: name, email, password.' 
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please enter a valid email address.' 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        success: false, 
        message: 'Password must be at least 6 characters long.' 
      });
    }

    // Check if user already exists
    const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get(email.toLowerCase());
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'User with this email already exists.' 
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user into SQLite
    const stmt = db.prepare(`
      INSERT INTO users (name, email, password, role) 
      VALUES (?, ?, ?, ?)
    `);
    const result = stmt.run(name.trim(), email.toLowerCase().trim(), hashedPassword, 'developer');

    // Fetch newly created user
    const newUser = db.prepare('SELECT id, name, email, role, created_at FROM users WHERE id = ?').get(result.lastInsertRowid);

    // Generate JWT Token
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '24h' }
    );

    return res.status(201).json({
      success: true,
      message: 'User registered successfully!',
      token,
      user: newUser
    });

  } catch (error) {
    console.error('Registration Error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error during registration. Please try again.' 
    });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide both email and password.' 
      });
    }

    // Check for user
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email.toLowerCase().trim());
    if (!user) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid email or password.' 
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid email or password.' 
      });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '24h' }
    );

    const userProfile = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      created_at: user.created_at
    };

    return res.status(200).json({
      success: true,
      message: 'Logged in successfully!',
      token,
      user: userProfile
    });

  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error during login. Please try again.' 
    });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user profile (Protected)
// @access  Private
router.get('/me', authMiddleware, (req, res) => {
  try {
    const user = db.prepare('SELECT id, name, email, role, created_at FROM users WHERE id = ?').get(req.user.id);
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    return res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Get User Error:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching user data.' });
  }
});

module.exports = router;
