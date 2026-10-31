const express = require('express');
const router = express.Router();
const db = require('../db');
const { verifyToken, requireAdmin } = require('../middleware/auth');

router.get('/:id', (req, res) => {
  db.get('SELECT * FROM orders WHERE id = ?', [req.params.id], (err, order) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!order) return res.status(404).json({ message: 'Order not found' });

    db.all(
      `SELECT oi.*, p.title, p.image_url 
       FROM order_items oi 
       JOIN products p ON oi.product_id = p.id 
       WHERE oi.order_id = ?`,
      [req.params.id],
      (err, items) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ ...order, items });
      }
    );
  });
});

router.post('/', verifyToken, (req, res) => {
  const { items, total_amount, shipping_address } = req.body;

  db.serialize(() => {
    db.run('BEGIN TRANSACTION');

    db.run(
      'INSERT INTO orders (user_id, total_amount, shipping_address) VALUES (?, ?, ?)',
      [req.user.id, total_amount, shipping_address],
      function (err) {
        if (err) {
          db.run('ROLLBACK');
          return res.status(400).json({ error: err.message });
        }
        const orderId = this.lastID;
        const stmt = db.prepare('INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?)');
        const updateStock = db.prepare('UPDATE products SET stock = stock - ? WHERE id = ?');

        for (const item of items) {
          stmt.run(orderId, item.product_id, item.quantity, item.unit_price);
          updateStock.run(item.quantity, item.product_id);
        }

        stmt.finalize();
        updateStock.finalize();
        db.run('COMMIT', (commitErr) => {
          if (commitErr) return res.status(500).json({ error: commitErr.message });
          res.status(201).json({ orderId, message: 'Order executed successfully' });
        });
      }
    );
  });
});

router.put('/:id/status', verifyToken, requireAdmin, (req, res) => {
  const { status } = req.body;
  db.run('UPDATE orders SET status = ? WHERE id = ?', [status, req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Order status updated successfully' });
  });
});

module.exports = router;
