const express = require('express');
const cors = require('cors');
const path = require('path');
require("dotenv").config();

const sequelize = require('./util/database');

const User = require('./models/user');
const Expense = require('./models/expense');
const PasswordReset = require('./models/passwordReset');


const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoute');
const premiumRoutes = require('./routes/premiumRoutes');
const passRoutes = require('./routes/forgotRoutes');
const { Sequelize } = require('sequelize');

const app = express();

app.use(express.json());
app.use(cors());


//routes
app.use('/user', userRoutes);
app.use('/tracker', expenseRoutes);
app.use('/premium', premiumRoutes);
app.use('/password', passRoutes);
app.use((req,res,next) => {
    res.status(404).sendFile(path.join(__dirname,'views','404.html'));
})
    //make a error route

//associations


User.hasMany(Expense);
Expense.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});

User.hasOne(PasswordReset, { foreignKey: "userId", onDelete: "CASCADE"});
PasswordReset.belongsTo(User, {foreignKey: "userId"});

//server initialization along with env
const PORT = process.env.PORT || 1800;


//sequelize.sync({force: true})
sequelize.sync()
.then(result => {
    app.listen(PORT);
}) .catch(err => console.log(err));
