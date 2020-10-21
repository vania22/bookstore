const express = require('express');
const router = express.Router();
const passportService = require('../passport/passport');
const passport = require('passport');

// Middleware to check if user is authenticated (for protected routes)
const requireAuth = passport.authenticate('jwt', { session: false });
const { userById } = require('../controllers/user');
const { generateToken, processPayment } = require('../controllers/braintree');

router.get('/braintree/getToken/:userId', requireAuth, generateToken);
router.post('/braintree/payment/:userId', requireAuth, processPayment);

router.param('userId', userById);

module.exports = router;
