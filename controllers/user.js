
const User = require('../models/user');

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
        const newUser = await User.create({
            name: name,
            email: email,
            password: password
        });
        res.status(201).json({message: 'User Created', user: newUser});
    }
    catch (err) {
        console.error(err);

        if(err.name === 'SequelizeUniqueConstraintError') {
            return res.status(404).json({error: 'Email already in use.'});
        }
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
        if(user.password !== password){
            return res.status(401).json({message: "Incorrect Password!"});
        }
        res.status(200).json({message: "Login Successful!", user: user.name});
    }
    catch(error) {
        console.log("Login Error: ",error);
        res.status(500).json({message: "Internal Server Error!"});
    }
};