const express = require('express');
const router = express.Router();
const passportService = require('../passport/passport');
const passport = require('passport');

// Authentication status
const requireAuth = passport.authenticate('jwt', { session: false });

// Sign In middleware for password comparison
const requireSignIn = passport.authenticate('local', { session: false });

const { signUpValidationRules, validate } = require('../validator/index');
const { signup, signin } = require('../controllers/user');

router.post('/signup', signUpValidationRules(), validate, signup);
router.post('/signin', requireSignIn, signin);
router.get('/', requireAuth, function (req, res) {
    res.send({ hi: 'there' });
});

module.exports = router;
