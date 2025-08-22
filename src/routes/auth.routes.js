const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User.model');

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // basic validation
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // check if user exists (by email or phone)
    const existing = await User.findOne({ $or: [{ email: email.toLowerCase() }, { phone }] });
    if (existing) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // create user
    const user = new User({
      name,
      email: email.toLowerCase(),
      phone,
      password: hashedPassword
    });

    await user.save();

    // return safe response (no password)
    return res.status(201).json({
      message: 'User created successfully',
      user: { id: user._id, name: user.name, email: user.email, phone: user.phone }
    });

  } catch (err) {
    // catch duplicate key error (race conditions)
    if (err && err.code === 11000) {
      return res.status(409).json({ message: 'User already exists' });
    }
    console.error('Signup error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
