
const express = require('express');

const router = express.Router();

const controller = require('../controllers/authController');

//Register request
router.post('/register', controller.register);

//Login request
router.post('/', controller.login);


module.exports = router;