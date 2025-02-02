const Expense = require('../models/expense');

exports.createTransaction = async (req, res) => {
    const {amount, description, category, userEmail} = req.body;

    if(!amount || !description || !category) {
        console.log("Validation Error");  //While in developing phase
        return res.status(400).json({error: "All fields must be valid."})
    }

    try {
        await Expense.create({
            amount: amount,
            description: description,
            category: category,
            userEmail: userEmail
        })
        res.status(201).json({message: 'Expense Added'});

    } catch(error) {
        console.log("Error: ", error);
        res.status(500).json({message: 'Internal Server Error'});
    }
}


exports.getTransactions = async (req, res) => {
    const {userEmail} = req.body;
    try {
        const expenses = await Expense.findAll({
            where: {userEmail},
            order: [['createdAt', 'ASC']]
        });
        res.status(200).json(expenses);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
};