const express = require('express');
const router = express.Router();

const expenseController = require('../controllers/expenses');
const authenticate = require('../middleware/authentication');

router.post('/post-Expense', authenticate, expenseController.createBill);
router.post('/get-Expense', authenticate, expenseController.getBill);
router.delete('/delete-Transaction/:id', authenticate, expenseController.deleteBill);

module.exports = router;