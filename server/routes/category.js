const express = require('express');
const router = express.Router();
const passportService = require('../passport/passport');
const passport = require('passport');

// Middleware to check if user is authenticated (for protected routes)
const requireAuth = passport.authenticate('jwt', { session: false });

// controllers
const {
    categoryById,
    create,
    read,
    list,
    remove,
    update,
} = require('../controllers/category');
const { isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.post('/category/create/:userId', requireAuth, isAdmin, create);
router.get('/category/:categoryId', read);
router.get('/categories', list);
router.put('/category/:categoryId/:userId', requireAuth, isAdmin, update);
router.delete('/category/:categoryId/:userId', requireAuth, isAdmin, remove);

router.param('userId', userById);
router.param('categoryId', categoryById);

module.exports = router;
