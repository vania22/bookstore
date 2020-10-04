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
        req.profile._id,
        req.body,
        { new: true },
        (err, user) => {
            if (err || !user) {
                return res.status(404).json({
                    error: "User can't be udpated",
                });
            }

            user.password = undefined;
            user.salt = undefined;
            return res.json({ user });
        },
    );
};
