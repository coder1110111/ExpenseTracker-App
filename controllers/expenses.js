const Expense = require('../models/expense');

exports.createTransaction = async (req, res) => {
    const {amount, description, category, userEmail} = req.body;

    if(!amount || !description || !category) {
        console.log("Validation Error");  //While in developing phase
        return res.status(400).json({error: "All fields must be valid."})
    }

    try {
        Expense.create({
            amount: amount,
            description: description,
            
        })
    }
}