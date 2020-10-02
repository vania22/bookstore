const express = require('express');
const router = express.Router();
const passportService = require('../passport/passport');
const passport = require('passport');

// Middleware to check if user is authenticated (for protected routes)
const requireAuth = passport.authenticate('jwt', { session: false });

// controllers
const { userById } = require('../controllers/user');
const { isAdmin } = require('../controllers/auth');

router.get('/secret/:userId', requireAuth, isAdmin, (req, res) => {
    res.json({ user: req.profile });
});

router.param('userId', userById);

module.exports = router;
