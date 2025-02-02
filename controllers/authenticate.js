const jwt = require('jsonwebtoken');
require("dotenv").config();

exports.Authenticate = async (req, res, next) => {      //This function is used as a middleware from here request is passed forward
    const token = await req.headers{Authorization};
    console.log(token);
    if(!token) {
        console.log('Unauthorized');
        return res.status(401).json({message: "Unauthorized!"});
    }

    try {
        console.log('aUTHORIZED');
        const decode = jwt.verify(token, process.env.JWT_KEY);
        req.user = decode;
        console.log(req.user);
        next();
    } catch (error) {   
        res.status(403).json({message: 'Invalid Token!'});
    }
}

