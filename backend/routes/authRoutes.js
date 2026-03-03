const express = require('express');
const router = express.Router();
const { loginUser, registerUser } = require('../controllers/authController');

// The path here should be just '/login', NOT '/api/users/login'
router.post('/login', loginUser); 
router.post('/register', registerUser);

module.exports = router;