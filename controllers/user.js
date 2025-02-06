
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();

exports.createUser = async (req, res) => {
    console.log('Request Received!');

    const name = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    //console.log(` ${name} ${email} ${password}`);

    if(!name || !email || !password) {
        console.log("Validation Error");
        return res.status(400).json({ error: "All fields must be provided."});
    }
    
    try {
        const existingUser = await User.findOne({where: {email}});
        if(existingUser){
            return res.status(409).json({message:'Email already in use!'});
        }

        bcrypt.hash(password, 10, async (error, hash) => {
            console.log(error); //this prints undefined if no error
            await User.create({
                name: name,
                email: email,
                password: hash,
            });
            res.status(201).json({message: 'User Created'});
        })
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error.'});
    }
};

exports.Login = async (req, res) => {
    const { email, password} = req.body;
    if(!email || !password) {
        return res.status(400).json({message: "All fields are required!"});
    }
    try{
        const user = await User.findOne({where: {email:email}});
        if(!user){
            return res.status(404).json({message: "Email does not exist!"});
        }
        const match = await bcrypt.compare(password, user.password)
        if(!match){
            return res.status(401).json({message: "Incorrect Password!"});
        }

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET);

        res.status(200).json({message: "Login Successful!", token});
    }
    catch(error) {
        console.log("Login Error: ",error);
        res.status(500).json({message: "Internal Server Error!"});
    }
};