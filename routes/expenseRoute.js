const express = require('express');
const router = express.Router();

const expenseController = require('../controllers/expenses');
const authenticate = require('../middleware/authentication');

//uses /tracker path

router.post('/post-Expense', authenticate, expenseController.createBill);
router.get('/get-Expense', authenticate, expenseController.getExpense);
router.delete('/delete-Transaction/:id', authenticate, expenseController.deleteExpense);

module.exports = router;