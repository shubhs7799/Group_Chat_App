const express = require('express');
const router = express.Router();
const { signup, login ,logout }= require('../controllers/authController');
const userAuth = require('../middleware/auth');

// Auth
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', userAuth, logout);

module.exports = router;