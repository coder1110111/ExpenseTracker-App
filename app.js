const express = require('express');
const cors = require('cors');

const sequelize = require('./util/database');
const Date = require('./models/date');
const CashFlow = require('./models/cashflow');
const User = require('./models/user');
const Expense = require('./models/expense');


const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoute');

const app = express();

app.use(express.json());
app.use(cors());


//routes
app.use('/user', userRoutes);
app.use('/tracker', expenseRoutes);
//associations
Date.hasMany(CashFlow);
CashFlow.belongsTo(Date);

User.hasMany(Expense);
Expense.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});

//server initialization
//sequelize.sync({force: true})
sequelize.sync()
.then(result => {
    app.listen(1800);
}) .catch(err => console.log(err));
