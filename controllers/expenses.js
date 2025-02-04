const { INTEGER } = require('sequelize');
const Expense = require('../models/expense');


exports.createTransaction = async (req, res) => {
    const {amount, description, category} = req.body;
    const currentTotal = req.user.total_expense;
    const newTotal = currentTotal + parseInt(amount);
    
    if(!amount || !description || !category) {
        //console.log("Validation Error");  //While in developing phase
        return res.status(400).json({error: "All fields must be valid."})
    }

    try {
        await req.user.createExpense({
            amount: amount,
            description: description,
            category: category
        });
        console.log(req.user);
        req.user.set({
            total_expense: newTotal
        });
        await req.user.save();
        console.log(req.user);
        res.status(201).json({message: 'Expense Added'});

    } catch(error) {
        console.log("Error: ", error);
        res.status(500).json({message: 'Internal Server Error'});
    }
}


exports.getTransactions = async (req, res) => {
    try {
        const expenses = await req.user.getExpenses({
            order: [['createdAt', 'ASC']]
        });
        res.status(200).json(expenses);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
};

exports.deleteTransaction = async (req, res) => {
    const id=req.params.id;
    const emailId = req.user.email;
    //console.log(id);
    try {
        const expense = await Expense.findOne({
            where: {
                id: id,
                userEmail:emailId
            }
        });
        //console.log(expense);     //Debugging
        const amount = expense.amount;
        const currentTotal = req.user.total_expense;
        const newTotal = currentTotal - amount;
        //console.log(newTotal);
        if(!expense){
            return res.status(404);
        }
        await expense.destroy();
        req.user.set({
            total_expense:newTotal
        });
        req.user.save();
        res.status(200).json({messsage: 'Node Deleted!'});
    } catch(err) {
        res.status(500).json({error: 'Internal Server Error'});
    }
};