
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
            return res.status(400).json({error: 'Email already in use.'});
        }
        return res.status(500).json({ error: 'Internal Server Error.'});
    }
}