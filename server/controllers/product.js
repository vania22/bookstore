const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Product = require('../models/product');

exports.create = (req, res) => {
    // Intercept form from request
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
                    error: err.message,
                });
            }

            return res.json({ product });
        });
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

exports.photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set('Content-Type', req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }

    next();
};

// Updates product by it's Id
exports.update = (req, res) => {
    // Intercept form from request
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

        // Creating object with form fields
        let product = req.product;
        product = _.extend(product, fields);

        // If form contains photo, add photo to the object
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

        // Finds product by it's Id and updates it
        Product.findByIdAndUpdate(
            req.product._id,
            product,
            { new: true },
            (err, updatedProduct) => {
                if (err || !product) {
                    return res.status(404).json({
                        error: "Product can't be updated",
                    });
                }

                return res.json({
                    updatedProduct,
                    result: 'Product has been successfully updated',
                });
            },
        );
    });
};

/**
 * Sell / Arrival
 *  By sell = /products?sortBy=sold&order=desc&limit=4
 * By sell = /products?sortBy=createdAt&order=desc&limit=4
 * If no params sent, then all products are returned
 */

exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : 'desc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    Product.find()
        .select('-photo')
        .populate('category')
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, products) => {
            if (err) {
                return res
                    .status(400)
                    .json({ error: 'Products not found', err: err.message });
            }

            return res.send(products);
        });
};

/**
 * Find products based on the req product category
 */
exports.listRelated = (req, res) => {
    let relatedCategory = req.product.category;
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    Product.find({ category: relatedCategory })
        .sort([['sold', 'desc']])
        .limit(limit)
        .exec((err, products) => {
            if (err || !products) {
                return res
                    .status(400)
                    .json({ error: "Can't find related products" });
            }

            return res.json(products);
        });
};

/**
 * list products by search
 * This will method will be cooperating with Front-End
 * User will be able to filter products based on category or price range
 * As the user manipulates with filters, api request will be made and
 * Return the products to the users based on his manipulations with filters
 */
exports.listBySearch = (req, res) => {
    let order = req.query.order ? req.query.order : 'desc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.body.limit ? parseInt(req.body.limit) : 6;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === 'price') {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1],
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    Product.find(findArgs)
        .select('-photo')
        .populate('category')
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: 'Products not found',
                });
            }
            res.json({
                size: data.length,
                data,
            });
        });
};

// Returns list of categories Ids which have products linked to them,
// ignoring empty categories
exports.listCategories = (req, res) => {
    Product.distinct('category', {}, (err, categories) => {
        if (err || !categories) {
            return res.status(400).json({ error: 'Categories not found' });
        }

        return res.json(categories);
    });
};

// Takes id from productId parameter and returns entire product object to req.product
exports.productById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if (err || !product) {
            return res.status(404).json({
                error: err.message,
            });
        }
        req.product = product;
        next();
    });
};
