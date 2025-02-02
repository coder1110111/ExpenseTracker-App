const express = require('express');
const router = express.Router();

const expenseController = require('../controllers/expenses');
const authenticate = require('../middleware/authentication');

router.post('/post-Expense', authenticate, expenseController.createTransaction);
router.post('/get-Expense', authenticate, expenseController.getTransactions);
router.delete('/delete-Transaction/:id', authenticate, expenseController.deleteTransaction);

module.exports = router;