const transactionService = require("../1_business/business_calculations");

// Display General Journal Page
async function showJournal(req, res) {
  try {
    const transactions = await transactionService.listTransactions();

    const rowsHTML = transactions.map(tx => `
      <tr>
        <td style="padding-left:40px;">${tx.transaction_date}</td>
        <td style="padding-left:40px;">${tx.transaction_type}</td>
        <td style="padding-left:40px;">${tx.description}</td>
        <td style="padding-left:40px;">${tx.is_credit == 0 ? "✔" : ""}</td>
        <td style="padding-left:40px;">${tx.is_credit == 1 ? "✔" : ""}</td>
        <td style="padding-left:40px;">${tx.amount.toFixed(2)}</td>
      </tr>
    `).join("");

    const html = `
      <!doctype html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>General Journal</title>
        <style>
          table, th, td { border: 1px solid black; border-collapse: collapse; padding: 4px; }
        </style>
      </head>
      <body>
        <h1>General Journal</h1>

        <form action="/add_transaction" method="post">
          <table style="width:100%">
            <tr>
              <th>Date</th>
              <th>Transaction Type</th>
              <th>Description</th>
              <th>Debit/Credit</th>
              <th>Amount ($)</th>
              <th>Action</th>
            </tr>
            <tr>
              <td><input type="date" name="transaction_date" required></td>
              <td><input type="text" name="transaction_type" required></td>
              <td><input type="text" name="description" style="width:100%;"></td>
              <td>
                <select name="is_credit" required>
                  <option value="">--Select--</option>
                  <option value="0">Debit</option>
                  <option value="1">Credit</option>
                </select>
              </td>
              <td><input type="number" step="0.01" name="amount" min="0" required></td>
              <td><button type="submit">Add</button></td>
            </tr>
          </table>
        </form>

        <h2 style="margin-top:30px;">Recorded Transactions</h2>
        <table style="width:100%">
          <tr>
            <th>Date</th>
            <th>Transaction Type</th>
            <th>Description</th>
            <th>Debit</th>
            <th>Credit</th>
            <th>Amount</th>
          </tr>
          ${rowsHTML}
        </table>
      </body>
      </html>
    `;

    res.send(html);
  } catch (err) {
    res.status(500).send("Error loading journal page: " + err.message);
  }
}

// Handle form submission
async function addTransaction(req, res) {
  try {
    await transactionService.createTransaction(req.body);
    res.redirect("/journal");
  } catch (err) {
    res.status(400).send("Error adding transaction: " + err.message);
  }
}

module.exports = {
  showJournal,
  addTransaction,
};