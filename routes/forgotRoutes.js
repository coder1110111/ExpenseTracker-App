const express = require('express');
const router = express.Router();

const passController = require('../controllers/forgotPassword');
const forgot = require('../controllers/forgot')
const resetController = require('../controllers/reset');


router.post('/forgotPassword', forgot.SendLink);
router.post('/resetpassword', resetController.passwordReset);
router.use('/Reset-Password/:uuid',express.static('./views/ResetPassword.html'));
module.exports = router;