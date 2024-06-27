const express = require('express');
const { signup, login } = require('../controllers/authController'); // Note the correct casing

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
