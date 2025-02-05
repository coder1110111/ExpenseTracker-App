const { INTEGER } = require('sequelize');
const Expense = require('../models/expense');
const sequelize = require('../util/database');


exports.createBill = async (req, res) => {
    const t = await sequelize.transaction();
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
        }, {transaction: t});
        //console.log(req.user);
        
        await req.user.update({total_expense: newTotal}, {transaction: t});
        //console.log(req.user);
        await t.commit();
        res.status(201).json({message: 'Expense Added'});

    } catch(error) {
        await t.rollback();
        console.log("Error: ", error);
        res.status(500).json({message: 'Internal Server Error'});
    }
}


exports.getBill = async (req, res) => {
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

exports.deleteBill = async (req, res) => {
    const t = await sequelize.transaction();
    const id=req.params.id;
    const Id = req.user.id;
    //console.log(id);
    try {
        const expense = await Expense.findOne({
            where: {
                id: id,
                userId:Id
            },
            transaction: t
        });

        if(!expense){
            await t.rollback();
            return res.status(404).json({message: "Expense not found"});
        }
        //console.log(expense);     //Debugging
        const amount = expense.amount;
        
        const newTotal = req.user.total_expense - amount;
        //console.log(newTotal);
        
        await expense.destroy({ transaction: t });
        await req.user.update({ total_expense: newTotal }, { transaction: t });

        await t.commit();
        res.status(200).json({messsage: 'Node Deleted!'});
    } catch(err) {
        await t.rollback();
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
};