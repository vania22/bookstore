const express = require('express');
const router = express.Router();
const passportService = require('../passport/passport');
const passport = require('passport');

// Middleware to check if user is authenticated (for protected routes)
const requireAuth = passport.authenticate('jwt', { session: false });

// controllers
const { create } = require('../controllers/category');
const { isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.post('/category/create/:userId', requireAuth, isAdmin, create);

router.param('userId', userById);

module.exports = router;
