const express = require('express');
const router = express.Router();
const passportService = require('../passport/passport');
const passport = require('passport');

// Middleware to check if user is authenticated (for protected routes)
const requireAuth = passport.authenticate('jwt', { session: false });

// Sign In middleware for password comparison
const requireSignIn = passport.authenticate('local', { session: false });

// Validation middleware for /signup route
const { signUpValidationRules, validate } = require('../validator/index');

// controllers
const { signup, signin } = require('../controllers/auth');

router.post('/signup', signUpValidationRules(), validate, signup);
router.post('/signin', requireSignIn, signin);

module.exports = router;
