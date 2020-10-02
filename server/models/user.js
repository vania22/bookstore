const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

// User model below:
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
        },
        email: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        about: {
            type: String,
            trim: true,
        },
        salt: {
            type: String,
        },
        role: {
            type: Number,
            default: 0,
        },
        history: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true },
);

// Pre-save process - encrypting password:
userSchema.pre('save', function (next) {
    const user = this;

    // Generate a salt and run callback
    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);

        // Has the password using salt
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) return next(err);

            // Overwrite plain password with hashed one
            user.password = hash;
            next();
        });
    });
});

// Defining a method to compare plain password to the hashed one
userSchema.methods.comparePasswords = function (plainPassword, callBack) {
    bcrypt.compare(plainPassword, this.password, function (err, result) {
        if (err) return callBack(err);

        callBack(null, result);
    });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
