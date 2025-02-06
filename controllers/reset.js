const resetTable = require('../models/linktable');
const User = require('../models/user');
const path = require('path');

exports.passwordReset = async(req, res) => {
    const id = req.body.id;
    const password = req.body.New_Password;
    console.log(id);
    console.log(password);

    const checkLink = await resetTable.findOne({ where: {id, isActive:'true'}});
    console.log(checkLink);
    if(!checkLink) {
        return res.status(400).json({message : 'Link is inValid OR Expired'});
    }
    
    res.sendFile(path.join(__dirname,'..','views','user.html'));

}