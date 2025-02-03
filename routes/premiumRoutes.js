const express = require('express');
const router = express.Router();

//importing middleware
const authenticate = require('../middleware/authentication');
const premiumController = require('../controllers/premium');  //import premium-controller

router.get('/get-Leaderboard', authenticate, premiumController.getLeaderboard );

//export
module.exports = router;