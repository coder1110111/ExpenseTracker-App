require('dotenv').config();
const axios = require('axios');



const User = require('../models/user');

exports.SendLink = async (req,res) => {
    const { email } = req.body;
    //console.log(email);
    try {
        
        const checkUser = await User.findOne({ where: {email: email}});

        if(!checkUser) {
            return res.status(404).json({error: 'Email does not exist in this system'});
        }
        
        const apiKey = process.env.BREVO_KEY
        const url = 'https://api.brevo.com/v3/smtp/email';

        const emailData = {
            sender: { name:"Expense Tracker App", email:'ayush.yadav.dev610@gmail.com'},
            to: [{ email: email}],
            subject: "Test Mail",
            htmlContent: '<html><body><h1>Check if email arrived</h1></body></html>'
        }
        console.log("CHECK 1");
        const response = await fetch(url, {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
                'api-Key':apiKey
            },
            body: JSON.stringify(emailData)
        });
        console.log('IT REACHES HERE!')
        //console.log(response);
        if(response.ok){
            console.log('Email Sent successfully!');
        }
        else {
            console.log('Something went wrong!');
        }

    } catch (error) {
        console.error('Error sending Email:', error);
    }
    
};