const sib = require('sib-api-v3-sdk');
require('dotenv').config();
const User = require('../models/user');

exports.SendLink = async (req,res) => {
    const { email } = req.body;
    try {
        console.log('Terminated Here');
        const checkUser = await User.findOne({ where: {email: email}});

        if(!checkUser) {
            return res.status(404).json({error: 'Email does not exist in this system'});
        }

        const client = sib.ApiClient.instance;
        const apiKey = client.authentications['api-key'];
        apiKey.apiKey = process.env.BREVO_KEY;

        const emailAPI = new sib.TransactionalEmailsApi();

        const emailData = {
            sender: {name: "Expense Tracker Beta", email: "ayush.yadav.dev610@gmail.com"},
            to: [{ email: email}, {email: "default5525@gmail.com"}],
            subject: "Test mail",
            htmlContent:`<h1>Check Data</h1>`
        };

        const response = await emailAPI.sendTransacEmail(emailData);
        console.log('Link sent successfully:',response);
    } catch (error) {
        console.error('Error sending Email:', error);
    }
    
};