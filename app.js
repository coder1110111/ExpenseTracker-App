const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const fs = require('fs');
require("dotenv").config();

const sequelize = require('./util/database');

const User = require('./models/user');
const Expense = require('./models/expense');
const LinkTable = require('./models/linktable');


const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoute');
const premiumRoutes = require('./routes/premiumRoutes');
const passRoutes = require('./routes/forgotRoutes');
//const { Sequelize } = require('sequelize');

const app = express();

//security implementation check
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');  
    next();
})

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {
    flags : 'a'     //This means to append new data in the file not overwrite it
});

app.use(morgan('combined', {stream: accessLogStream}));        //This alone will log in console
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

User.hasOne(LinkTable, { foreignKey: "userId", onDelete: "CASCADE"});
LinkTable.belongsTo(User, {foreignKey: "userId"});

//server initialization along with env
const PORT = process.env.PORT || 1800;


//sequelize.sync({force: true})
sequelize.sync()
.then(result => {
    app.listen(PORT);
}) .catch(err => console.log(err));
