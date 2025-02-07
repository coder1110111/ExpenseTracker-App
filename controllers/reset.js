const resetTable = require('../models/linktable');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const sequelize = require('../util/database');

exports.passwordReset = async(req, res) => {
    const t = await sequelize.transaction();
    const id = req.body.id;
    const password = req.body.New_Password;
    console.log(id);
    console.log(password);

    const checkLink = await resetTable.findOne({ where: {id, isActive:'true'}});
    //console.log(checkLink);
    if(!checkLink) {
        return res.status(400).json({message : 'Link is inValid OR Expired'});
    }
    else {
        checkLink.update({isActive : 'false'}, {transaction : t});
        console.log('In Else Block.');
        bcrypt.hash(password, 10, async (error, hash) => {
            console.log(error);
            const user = await User.findOne({
                where: { id: checkLink.userId }});
            //console.log(user);
            await user.update({password : hash}, {transaction : t});

            await t.commit();
            res.status(201).json({message: 'Password Updated! Close this window and then sign-in.', windowClose: 'true'});
        })
        //return res.status(201).json({windowClose: true});       //windowClose() does not work if we do not use window.open
        
    }
    

}