const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router.post('/create-user', userController.createUser);
router.post('/login', userController.Login);

module.exports = router;