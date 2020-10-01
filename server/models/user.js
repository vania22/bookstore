const mongoose = require('mongoose');
const crypto = require('crypto');
const { v1: uuidv1 } = require('uuid');

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
        hashed_password: {
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

// Virtual fields below:

userSchema
    .virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = uuidv1();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(() => this._password);

userSchema.methods = {
    encryptPassword: function (password) {
        if (!password) return null;
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (error) {
            return null;
        }
    },
};

const User = mongoose.model('User', userSchema);

module.exports = User;
