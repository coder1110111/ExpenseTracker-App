const LinkTable = require('../models/linktable');
const path = require('path');

exports.sendPage = async (req,res) => {
    const id = req.params.uuid;
    console.log('Checking if id is passed on from url: ',id);
    try {
        const checkLink = await LinkTable.findOne({ where: {id:id, isActive:'true'}});
        if(!checkLink) {
            return res.status(400).send('Invalid or expired Link');
        }
        res.sendFile(path.join(__dirname, '..', 'views', 'ResetPassword.html'));

    } catch (error) {
        console.error('Error sending Page: ', error);
    }
    
};