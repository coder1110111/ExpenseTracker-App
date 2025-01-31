const express = require('express');
const cors = require('cors');

const sequelize = require('./util/database');
const Date = require('./models/date');
const CashFlow = require('./models/cashflow');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());
app.use(cors());


//routes
app.use('/user', userRoutes);
//associations
Date.hasMany(CashFlow);
CashFlow.belongsTo(Date);

//server initialization
sequelize.sync()
.then(result => {
    app.listen(1800);
}) .catch(err => console.log(err));
