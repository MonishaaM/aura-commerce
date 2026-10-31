const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

const JWT_SECRET = process.env.JWT_SECRET || 'aura_super_secure_jwt_secret_2026';

// Register Customer / Admin
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required.' });
  }

  // Check if user already exists
  db.get('SELECT * FROM users WHERE email = ?', [email], (err, existingUser) => {
    if (err) {
      console.error('DB lookup error:', err.message);
      return res.status(500).json({ error: 'Database verification failed.' });
    }

    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered. Please log in.' });
    }

    // Hash password
    const saltRounds = 10;
    const password_hash = bcrypt.hashSync(password, saltRounds);
    const role = email.toLowerCase().includes('admin') ? 'admin' : 'customer';

    const insertSql = 'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)';
    db.run(insertSql, [name, email, password_hash, role], function (insertErr) {
      if (insertErr) {
        console.error('DB insert error:', insertErr.message);
        return res.status(500).json({ error: 'Failed to record user credentials.' });
      }

      const user = { id: this.lastID, name, email, role };
      const token = jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });

      return res.status(201).json({ token, user });
    });
  });
});

// Login User
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err) {
      console.error('Login DB error:', err.message);
      return res.status(500).json({ error: 'Database verification failed.' });
    }

    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }

    const isMatch = bcrypt.compareSync(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }

    const userData = { id: user.id, name: user.name, email: user.email, role: user.role };
    const token = jwt.sign(userData, JWT_SECRET, { expiresIn: '7d' });

    return res.status(200).json({ token, user: userData });
  });
});

module.exports = router;
