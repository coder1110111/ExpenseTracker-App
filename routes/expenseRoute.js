const express = require('express');
const router = express.Router();

const expenseController = require('../controllers/expenses');

router.post('/post-Expense', expenseController.createTransaction);
router.post('/get-Expense', expenseController.getTransactions);
router.delete('/delete-Transaction/:id', expenseController.deleteTransaction);

module.exports = router;