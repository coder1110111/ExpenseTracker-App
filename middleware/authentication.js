const jwt = require('jsonwebtoken');
require("dotenv").config();
const User = require('../models/user');

const authenticate = (req, res, next) => {
    const token = req.header('Authorization');
    //console.log(token + ">>>> is token");
    if(!token){
        return res.status(401).json({message: "Unauthorized: No token provided"});
    }

    try {
        //console.log('in try');
        const email = jwt.verify(token, process.env.JWT_SECRET).email;
        //console.log('after convert');
        //console.log(email);
        User.findOne({where: {email}})
        .then(user => {
            //console.log(user);
            req.user = user;
            next();
        }) .catch(err => {throw new Error(err)});
        
    } catch (error) {
        return res.status(403).json({message: "Forbidden: Invalid or Expired Token"});  //Expiration of token not implemented yet
    }
}

module.exports = authenticate;