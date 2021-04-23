const express = require('express');
const router = express.Router();

// Auth api
router.use('/auth', require('./auth'));

// User api
router.use('/user', require('./user'));

// Envelope api
router.use('/envelope', require('./envelope'));

module.exports = router;
