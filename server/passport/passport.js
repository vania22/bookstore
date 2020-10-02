const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const LocalStrategy = require('passport-local');

// Set up options for Local Strategy
const localOptions = { usernameField: 'email' };

// Create Local Strategy  --comparing passwords
const localLogin = new LocalStrategy(localOptions, function (
    email,
    password,
    done,
) {
    // Verify user with email provided exists in DB
    User.findOne({ email }, function (err, user) {
        if (err) return done(err);

        // If email doesn't exist in DB return false
        if (!user) return done(null, false);

        // Comparing passwords using method defined in user model
        user.comparePasswords(password, function (err, result) {
            if (err) return done(err);

            // If password match is false return false
            if (!result) return done(null, false);

            return done(null, user);
        });
    });
});

// Set up options for Jwt Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: process.env.JWT_SECRET,
};

// Create Jwt Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
    // See if the user ID in payload exists in DB
    User.findById(payload.sub, function (err, user) {
        if (err) return done(err, false);

        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
});

passport.use(jwtLogin);
passport.use(localLogin);
