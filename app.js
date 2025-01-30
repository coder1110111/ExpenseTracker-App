const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const sequelize = require('./util/database');
const Date = require('./models/date');
const CashFlow = require('./models/cashflow');

app.use(cors());
app.use(bodyParser.json({extended:false}));

//routes

//associations
Date.hasMany(CashFlow);
CashFlow.belongsTo(Date);

//server initialization
sequelize.sync()
.then(result => {
    app.listen(64);
}) .catch(err => console.log(err));
