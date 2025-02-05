const jwt = require('jsonwebtoken');
require("dotenv").config();
const User = require('../models/user');

const authenticate = async (req, res, next) => {
    const token = req.header('Authorization');
    //console.log(token + ">>>> is token");
    if(!token){
        return res.status(401).json({message: "Unauthorized: No token provided"});
    }

    try {
        //console.log('in try');
        const id = jwt.verify(token, process.env.JWT_SECRET).id;
        //console.log('after convert');
        //console.log(email);
        const user = await User.findOne({where: {id}});
        if(!user) {
            console.log('No User!');
        }
        req.user = user;
        next();
        
        
    } catch (error) {
        return res.status(403).json({message: "Forbidden: Invalid or Expired Token"});  //Expiration of token not implemented yet
    }
}

module.exports = authenticate;