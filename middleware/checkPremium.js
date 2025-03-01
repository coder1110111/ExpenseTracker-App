
const checkPremium = async (req, res, next) => {
    const user = req.user;
    //console.log(user);
    //Here we can see if user is Premium or not
    next();
}

module.exports = checkPremium;