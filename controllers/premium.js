const User = require('../models/user');
const Expense = require('../models/expense');
const { Sequelize, Model } = require('sequelize');
const path = require('path');

exports.getLeaderboard = async (req, res) => {
    //console.log(req.user);
    try {

        const data = await User.findAll({
            attributes: ['name', 'total_expense'],
            order: [['total_expense', 'DESC']],
            raw: true
        });

        //Below program not feasable when more users join
        /* const data = await User.findAll({
            attributes: ['name',[Sequelize.fn('SUM', Sequelize.col('expenses.amount')), 'totalExpense']],
            include: [
                {
                    model: Expense,
                    attributes: [],
                    required:false //essentially even if expense value is null will create table for user OR LEFT JOIN
                }
            ],
            group: ['User.email'],
            order: [['totalExpense', 'DESC']],
            raw: true       // will return straight json data.
        }); */              
        console.log(data);
        res.status(201).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    }
}

exports.getPDF = async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '..', 'views', 'checkPremium.html'));
    } catch (err) {
        console.log(err);
        res.status(500).josn({error: "Internal Server Error"});
    }
}

exports.getData = async (req, res) => {
    try {
        const expenses = await req.user.getExpenses({
            order: [['createdAt', 'ASC']]
        });
        //console.log(typeof page);
        res.status(201).json({expenses: expenses});
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
}