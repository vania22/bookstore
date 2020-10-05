const jwt = require('jwt-simple');
const User = require('../models/user');

// Method to generate JWT Token
function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, process.env.JWT_SECRET);
}

// Sign Up controller
exports.signup = (req, res, next) => {
    const email = req.body.email;

    // See if a user with the given email exists
    User.findOne({ email }, function (err, existingUser) {
        if (err) {
            return next(err);
        }
        //If a user with email exists throw an error
        if (existingUser) {
            return res.status(422).send({ error: 'Email is in use' });
        }
    });

    //If a user doesn't exist CREATE user (save email and password)
    const user = new User(req.body);

    // Save user in DB
    user.save((err, user) => {
        if (err) {
            return next(err);
        }

        const { email, name, role, _id } = user;
        // return response with JWT Token and user details
        res.json({
            token: tokenForUser(user),
            user: {
                email,
                name,
                role,
                _id,
            },
        });
    });
};

// Sign In controller
exports.signin = (req, res, next) => {
    // user has already been authenticated using Passport middleware
    const { email, name, role, _id } = req.user;
    // return response with JWT Token and user details
    res.json({
        token: tokenForUser(req.user),
        user: {
            email,
            name,
            role,
            _id,
        },
    });
};

// Is Admin middleware, checks if user is admin or not
exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: 'Admin resource! Access denied',
        });
    }

    next();
};
