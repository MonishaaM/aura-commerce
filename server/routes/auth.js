const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

const JWT_SECRET = process.env.JWT_SECRET || 'aura_super_secure_jwt_secret_2026';

// Cloud In-Memory Fallback store if SQLite ephemeral disk locks
const memoryUsers = new Map();

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const hashedPassword = await bcrypt.hash(password, 10);
    const role = normalizedEmail.includes('admin') ? 'admin' : 'customer';

    // Try SQLite first
    db.run(
      'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
      [name.trim(), normalizedEmail, hashedPassword, role],
      function (err) {
        let userId = this ? this.lastID : Date.now();

        if (err) {
          // If already exists in SQLite
          if (err.message && err.message.includes('UNIQUE')) {
            return res.status(400).json({ error: 'Account with this email already exists.' });
          }
          // Ephemeral storage fallback
          memoryUsers.set(normalizedEmail, { id: userId, name: name.trim(), email: normalizedEmail, password_hash: hashedPassword, role });
        } else {
          memoryUsers.set(normalizedEmail, { id: userId, name: name.trim(), email: normalizedEmail, password_hash: hashedPassword, role });
        }

        const token = jwt.sign({ id: userId, email: normalizedEmail, role }, JWT_SECRET, { expiresIn: '7d' });
        return res.status(201).json({
          token,
          user: { id: userId, name: name.trim(), email: normalizedEmail, role }
        });
      }
    );
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal registration handshake failure.' });
  }
});

// LOGIN / SIGN-IN
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Query SQLite database
    db.get('SELECT * FROM users WHERE email = ?', [normalizedEmail], async (err, row) => {
      let targetUser = row;

      // Check fallback memory if SQLite missed it
      if (!targetUser && memoryUsers.has(normalizedEmail)) {
        targetUser = memoryUsers.get(normalizedEmail);
      }

      if (!targetUser) {
        return res.status(400).json({ error: 'Account not found. Please register first.' });
      }

      const match = await bcrypt.compare(password, targetUser.password_hash);
      if (!match) {
        return res.status(400).json({ error: 'Invalid password. Please check your credentials.' });
      }

      const token = jwt.sign(
        { id: targetUser.id, email: targetUser.email, role: targetUser.role },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      return res.json({
        token,
        user: { id: targetUser.id, name: targetUser.name, email: targetUser.email, role: targetUser.role }
      });
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal login handshake failure.' });
  }
});

module.exports = router;
