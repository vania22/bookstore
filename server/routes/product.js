const express = require('express');
const router = express.Router();
const passportService = require('../passport/passport');
const passport = require('passport');

// Middleware to check if user is authenticated (for protected routes)
const requireAuth = passport.authenticate('jwt', { session: false });

// controllers
const {
    create,
    productById,
    read,
    remove,
    update,
} = require('../controllers/product');
const { isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.post('/product/create/:userId', requireAuth, isAdmin, create);
router.get('/product/:productId', read);
router.put('/product/:productId/:userId', requireAuth, isAdmin, update);
router.delete('/product/:productId/:userId', requireAuth, isAdmin, remove);

router.param('userId', userById);
router.param('productId', productById);

module.exports = router;
