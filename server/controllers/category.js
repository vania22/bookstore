const Category = require('../models/category');

// Creates new category
exports.create = (req, res) => {
    const category = new Category({ name: req.body.name });
    category.save((err, category) => {
        if (err) {
            return res.status(500).json({
                error: 'please try again later',
            });
        }

        return res.json({ category });
    });
};

// Returns category object by it's id from categoryId url parameter
exports.read = (req, res) => {
    return res.json({ category: req.category });
};

// Removes category by it's Id
exports.remove = (req, res) => {
    Category.findByIdAndRemove(req.category._id, (err, category) => {
        if (err || !category) {
            return res.status(400).json({ error: "Category can't be deleted" });
        }

        return res.json({
            category,
            result: 'Category has been successfully deleted',
        });
    });
};

// Updates category by it's Id
exports.update = (req, res) => {
    if (!req.body.name) {
        return res.status(400).json({ error: 'name must be provided' });
    }

    Category.findByIdAndUpdate(
        req.category._id,
        { name: req.body.name },
        (err, category) => {
            if (err || !category) {
                return res
                    .status(400)
                    .json({ error: "Category can't be updated" });
            }

            return res.json({
                category,
                result: 'Category has been successfully updated',
            });
        },
    );
};

// Returns array of all categories
exports.list = (req, res) => {
    Category.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        res.json(data);
    });
};

// Takes id from categoryId parameter and returns entire category object to req.category
exports.categoryById = (req, res, next, id) => {
    Category.findById(id, (err, category) => {
        if (err || !category) {
            return res.status(400).json({
                error: "Category wasn't found",
            });
        }

        req.category = category;
        next();
    });
};
