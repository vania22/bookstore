const User = require('../models/user');

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(404).json({
                error: 'User not found',
            });
        }
        req.profile = user;
        next();
    });
};

// Return user object based on userId
exports.read = (req, res) => {
    let user = req.profile;
    return res.json({ user });
};

// Update user object
exports.update = (req, res) => {
    User.findByIdAndUpdate(
        { _id: req.profile._id },
        { name: req.body.name, email: req.body.email },
        { new: true },
        (err, user) => {
            if (err) {
                return res.status(400).json({
                    message: "User can't be udpated",
                });
            } else {
                user.password = undefined;
                user.salt = undefined;
                return res.json({ user });
            }
        },
    );
};

exports.addUserOrderHistory = (req, res, next) => {
    const userId = req.profile._id;
    const history = [];
    req.body.order.products.forEach((item) => {
        history.push({
            _id: item._id,
            name: item.name,
            description: item.description,
            category: item.category,
            count: item.count,
            transactionId: req.body.order.transactionId,
            price: item.price * item.count,
        });
    });

    User.findByIdAndUpdate(
        { _id: userId },
        { $push: { history } },
        { new: true },
        (err, result) => {
            if (err) {
                return res.status(400).json(err);
            }
        },
    );

    next();
};

exports.listUserPurchaseHistory = (req, res) => {
    const userId = req.profile._id;

    User.findById({ _id: userId }, (err, user) => {
        if (err) {
            return res.status(400).json(err);
        } else {
            return res.json({ userHistory: user.history });
        }
    });
};
