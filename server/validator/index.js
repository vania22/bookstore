const { body, validationResult } = require('express-validator');

// Sign Up validation schema
const signUpValidationRules = () => {
    return [
        // Username must be an email and not empty
        body('email')
            .isEmail()
            .withMessage('Provide a valid email address')
            .notEmpty()
            .withMessage('Email is required'),
        // Password must be at least 6 chars long and not empty
        body('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long')
            .notEmpty()
            .withMessage('Password is required'),

        // Name must not be empty
        body('name')
            .notEmpty()
            .withMessage('Name is required')
            .isLength({ max: 32 })
            .withMessage('Name must contain less than 32 characters'),
    ];
};

// Function which returns first error message from the errors array:
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

    return res.status(422).json({
        // That mess below is used to return string instead of object
        error: extractedErrors[0][Object.keys(extractedErrors[0])[0]],
    });
};

module.exports = {
    signUpValidationRules,
    validate,
};
