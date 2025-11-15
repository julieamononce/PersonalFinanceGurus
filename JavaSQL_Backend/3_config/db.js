const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();

// IMPORTANT: use a .db file instead of .sql
const db = new sqlite3.Database("../4_database/information.db");

// 1. Handle POST from the General Journal form
router.post("/add_transaction", (req, res) => {
  const { transaction_date, transaction_type, description, is_credit, amount } = req.body;
  const user_id = 1;

  const sql = `
    INSERT INTO user_transactions 
    (user_id, transaction_date, transaction_type, description, is_credit, amount)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.run(sql, [user_id, transaction_date, transaction_type, description, is_credit, amount], (err) => {
    if (err) {
      console.error("Error inserting transaction:", err.message);
      res.status(500).send("Database insert failed.");
    } else {
      console.log("✅ Transaction added successfully!");
      res.redirect("/journal");
    }
  });
});

// 2. Fetch all transactions
router.get("/journal", (req, res) => {
  const sql = `SELECT * FROM user_transactions ORDER BY transaction_date DESC`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error("Error fetching transactions:", err.message);
      res.status(500).send("Error retrieving transactions.");
    } else {
      let tableRows = rows
        .map(tx => `
          <tr>
            <td>${tx.transaction_date}</td>
            <td>${tx.transaction_type}</td>
            <td>${tx.description}</td>
            <td>${tx.is_credit == 0 ? "✔" : ""}</td>
            <td>${tx.is_credit == 1 ? "✔" : ""}</td>
            <td>${tx.amount.toFixed(2)}</td>
          </tr>
        `)
        .join("");

      const html = `
        <html>
          <body>
            <h1>General Journal</h1>
            <table>${tableRows}</table>
          </body>
        </html>
      `;

      res.send(html);
    }
  });
});

module.exports = router;
