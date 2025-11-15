const db = require("../3_config/db");

// Insert new transaction
function addTransaction({ user_id, transaction_date, transaction_type, description, is_credit, amount }) {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO user_transactions 
      (user_id, transaction_date, transaction_type, description, is_credit, amount)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.run(sql, [user_id, transaction_date, transaction_type, description, is_credit, amount], function(err) {
      if (err) reject(err);
      else resolve({ id: this.lastID });
    });
  });
}

// Fetch all transactions
function getAllTransactions() {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM user_transactions ORDER BY transaction_date DESC`;
    db.all(sql, [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

module.exports = {
  addTransaction,
  getAllTransactions,
};