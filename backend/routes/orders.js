const express = require("express");
const router = express.Router();
const db = require("../db");

// Place order
router.post("/", (req, res) => {
  const { buyerName, productName, quantity, address } = req.body;

  if (!buyerName || !productName || !quantity || !address) {
    return res.status(400).json({ error: "All fields are required" });
  }

  db.run(
    `INSERT INTO orders (buyerName, productName, quantity, address)
     VALUES (?, ?, ?, ?)`,
    [buyerName, productName, quantity, address],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ orderId: this.lastID });
    }
  );
});

// Track order
router.get("/:id", (req, res) => {
  db.get(
    "SELECT status FROM orders WHERE id = ?",
    [req.params.id],
    (err, row) => {
      if (!row) {
        return res.json({ status: "Order Not Found" });
      }
      res.json(row);
    }
  );
});

// Admin - view all orders
router.get("/", (req, res) => {
  db.all("SELECT * FROM orders", [], (err, rows) => {
    res.json(rows);
  });
});

// Admin - update status
router.put("/:id", (req, res) => {
  db.run(
    "UPDATE orders SET status='Delivered' WHERE id = ?",
    [req.params.id],
    () => res.json({ success: true })
  );
});

module.exports = router;
