const express = require('express');
const router = express.Router();
const { signUpValidationRules, validate } = require('../validator/index');

const { signup } = require('../controllers/user');

router.post('/signup', signUpValidationRules(), validate, signup);

module.exports = router;
