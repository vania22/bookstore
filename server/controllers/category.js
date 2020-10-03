const Category = require('../models/category');

exports.create = (req, res) => {
    const category = new Category({ name: req.body.name });
    category.save((err, category) => {
        if (err) {
            return res.status(500).json({
                error: 'please try again later',
            });
        }

        res.json({ category });
    });
};
