const express = require('express');
const router = express.Router();

//importing middleware
const authenticate = require('../middleware/authentication');
const checkPremium = require('../middleware/checkPremium');
const premiumController = require('../controllers/premium');  //import premium-controller

router.get('/get-Leaderboard', authenticate, premiumController.getLeaderboard );
router.get('/get-PDF', premiumController.getPDF);
router.get('/Document', authenticate, premiumController.getData);

//export
module.exports = router;