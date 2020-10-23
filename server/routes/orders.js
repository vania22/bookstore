const express = require('express');
const router = express.Router();
const passportService = require('../passport/passport');
const passport = require('passport');

// Middleware to check if user is authenticated (for protected routes)
const requireAuth = passport.authenticate('jwt', { session: false });

const { userById } = require('../controllers/user');
const { isAdmin } = require('../controllers/auth');

const { create } = require('../controllers/orders');
const { addUserOrderHistory } = require('../controllers/user');
const {
    updateProductQuantity,
    updateProductSoldCount,
} = require('../controllers/product');

router.post(
    '/order/create/:userId',
    requireAuth,
    addUserOrderHistory,
    updateProductQuantity,
    updateProductSoldCount,
    create,
);

router.param('userId', userById);

module.exports = router;
