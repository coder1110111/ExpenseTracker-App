const express = require('express');
const router = express.Router();

const expenseController = require('../controllers/expenses');
const authController = require('../controllers/authenticate');

router.post('/post-Expense', authController.Authenticate, expenseController.createTransaction);
router.post('/get-Expense', authController.Authenticate, expenseController.getTransactions);
router.delete('/delete-Transaction/:id', authController.Authenticate, expenseController.deleteTransaction);

module.exports = router;