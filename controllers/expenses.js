const { INTEGER } = require('sequelize');
const Expense = require('../models/expense');
const sequelize = require('../util/database');
const path = require('path');


exports.getTracker = async (req, res) => {
    //console.log("Is in controller");
    res.sendFile(path.join(__dirname, '..', 'views', 'tracker.html'));
}

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


exports.getExpense = async (req, res) => {
    const itemperpage = parseInt(req.header('ItemsPerPage'));
    //console.log(itemperpage ," : ", typeof itemperpage)
    const page = req.query.page || 1;
    //console.log('page :',page);
    let totalExpenses;

    try {
        Expense.count({where: {userId: req.user.id}})
        .then((total) => {
            totalExpenses = total;
        }).catch(err => {console.log(err)}); 
        const expenses = await req.user.getExpenses({
            offset: (page - 1) * itemperpage,
            limit: itemperpage,
            order: [['createdAt', 'ASC']]
        });
        //console.log(typeof page);
        res.status(201).json({
            expenses: expenses,
            currentPage: page,
            hasNextPage: itemperpage * page < totalExpenses,
            nextPage: parseInt(page) + 1,
            hasPreviousPage: page > 1,
            previousPage: parseInt(page) - 1,
            lastPage: Math.ceil(totalExpenses / itemperpage)
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
};

exports.deleteExpense = async (req, res) => {
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