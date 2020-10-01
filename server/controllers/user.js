const User = require('../models/user');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.signup = (req, res) => {
    console.log(req.body);
    const user = new User(req.body);

    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err),
            });
        }

        user.hashed_password = undefined;
        user.salt = undefined;

        res.json({
            user,
        });
    });
};
