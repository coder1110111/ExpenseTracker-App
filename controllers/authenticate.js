const jwt = require('jsonwebtoken');
require("dotenv").config();

exports.Authenticate = (req, res, next) => {      //This function is used as a middleware from here request is passed forward
    const token = req.headers.Authorization;
    if(!token) {
        return res.status(401).json({message: "Unauthorized!"});
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_KEY);
        req.user = decode;
        next();
    } catch (error) {   
        res.status(403).json({message: 'Invalid Token!'});
    }
}

