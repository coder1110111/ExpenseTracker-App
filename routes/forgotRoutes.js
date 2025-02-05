const express = require('express');
const router = express.Router();

const passController = require('../controllers/forgotPassword');

router.get('/forgotPassword',passController.SendLink);

module.exports = router;