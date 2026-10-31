const express = require('express');
const router = express.Router();
const db = require('../db');
const { verifyToken, requireAdmin } = require('../middleware/auth');

router.get('/', (req, res) => {
  db.all('SELECT * FROM products ORDER BY created_at DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.post('/', verifyToken, requireAdmin, (req, res) => {
  const { title, description, price, stock, category, image_url, specs } = req.body;
  db.run(
    'INSERT INTO products (title, description, price, stock, category, image_url, specs) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [title, description, price, stock, category, image_url, JSON.stringify(specs || {})],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, message: 'Product added successfully' });
    }
  );
});

module.exports = router;
