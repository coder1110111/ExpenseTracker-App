const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router.get('/create-user', userController.getCreateUser);
router.post('/create-user', userController.postCreateUser);
router.get('/login', userController.getLogin)
router.post('/login', userController.postLogin);

module.exports = router;