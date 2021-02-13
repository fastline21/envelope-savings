const express = require('express');
const router = express.Router();

// Test api
router.get('/', (req, res) => {
	res.send('Welcome to the Envelope Savings API');
});

// Auth api
router.use('/auth', require('./auth'));

// User api
router.use('/user', require('./user'));

// Envelope api
router.use('/envelope', require('./envelope'));

module.exports = router;
