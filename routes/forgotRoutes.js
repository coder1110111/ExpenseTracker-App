const express = require('express');
const router = express.Router();

const passReset = require('../controllers/resetPageSend');
const forgot = require('../controllers/forgot')
const resetController = require('../controllers/reset');

router.get('/forgotPassword', forgot.SendPage);
router.post('/forgotPassword', forgot.SendLink);
router.post('/resetpassword', resetController.passwordReset);
router.use('/Reset-Password/:uuid', passReset.sendPage);

module.exports = router;