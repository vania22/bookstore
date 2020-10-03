const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Product = require('../models/product');

exports.create = (req, res) => {
    // Interception form from request
    let form = new formidable.IncomingForm();

    form.keepExtensions = true;

    // Parsing form data
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        // Check for all mandatory fields
        const { name, description, price, category } = fields;
        if (!name || !description || !price || !category) {
            return res.status(400).json({
                error:
                    'Please populate all mandatory fields: Name, Description, Price, Category',
            });
        }

        // Creating product with form fields
        let product = new Product(fields);

        // If form contains photo, add photo to product
        if (files.photo) {
            // Photo size validation <= 5mb
            if (files.photo.size > 3000000) {
                return res
                    .status(400)
                    .json({ error: 'Photo must be less than 5mb' });
            }

            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        product.save((err, product) => {
            if (err) {
                return res.status(400).json({
                    error: 'please try again later',
                });
            }

            res.json({ product });
        });
    });
};

// Takes id from productId parameter and returns entire product object to req.product
exports.productById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if (err || !product) {
            return res.status(404).json({
                error: 'Product not found',
            });
        }
        req.product = product;
        next();
    });
};

// Returns product object
exports.read = (req, res) => {
    req.product.photo = undefined;

    return res.json(req.product);
};

// Removes product by it's Id
exports.remove = (req, res) => {
    Product.findByIdAndRemove(req.product._id, (err, product) => {
        if (err || !product) {
            return res.status(404).json({
                error: "Product can't be deleted",
            });
        }

        product.photo = undefined;

        return res.json({
            product,
            result: 'Product has been successfully deleted',
        });
    });
};