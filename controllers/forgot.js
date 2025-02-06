//now main file instead of forgotPassword

const Sib = require('sib-api-v3-sdk');
const User = require('../models/user');
const PasswordReset = require('../models/linktable');

require('dotenv').config();


exports.SendLink = async (req, res) => {
    const { email } = req.body;

    const client = Sib.ApiClient.instance;

    const apiKey = client.authentications['api-key'];
    apiKey.apiKey = process.env.BREVO_KEY;
    
    const tranEmailApi = new Sib.TransactionalEmailsApi();
    
    const sender = {
        email: 'ayush.yadav.dev610@gmail.com'
    };
    
    const receivers = [
        {
            email: email
        }
    ];
        
    try {
        const checkUser = await User.findOne({ where: {email: email}});

        if(!checkUser) {
            return res.status(404).json({error: 'Email does not exist in this system'});
        }

        const activeLink = await PasswordReset.findOne({where: {userId : checkUser.id}});
        if(activeLink){
            await activeLink.destroy();
        }

        const createLink = await PasswordReset.create({
            userId: checkUser.id,
            isActive: 'true'
        });
        console.log(createLink);

        const response = await tranEmailApi.sendTransacEmail({
            sender,
            to: receivers,
            subject: 'Test Email using sib',
            textContent:`Please click on this link to change your password  http://localhost:1800/password/Reset-Password/${createLink.id}!`
            
        });

        console.log(response);

    } catch (error) {
        console.log('There is an error >>>>' ,error);
    }
}

