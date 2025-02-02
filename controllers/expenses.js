const Expense = require('../models/expense');


exports.createTransaction = async (req, res) => {
    const {amount, description, category} = req.body;

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
    console.log(id);
    try {
        const expense = await Expense.findByPk(id);

        if(!expense){
            return res.status(404);
        }
        await expense.destroy();
        res.status(200).json({messsage: 'Node Deleted!'});
    } catch(err) {
        res.status(500).json({error: 'Internal Server Error'});
    }
};