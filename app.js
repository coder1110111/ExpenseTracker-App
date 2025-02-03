const express = require('express');
const cors = require('cors');
require("dotenv").config();

const sequelize = require('./util/database');

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


User.hasMany(Expense);
Expense.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});

//server initialization along with env
const PORT = process.env.PORT || 1800;


//sequelize.sync({force: true})
sequelize.sync()
.then(result => {
    app.listen(PORT);
}) .catch(err => console.log(err));
