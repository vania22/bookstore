const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

// User model below:
const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
        },
        description: {
            type: String,
            required: true,
            maxlength: 2000,
        },
        price: {
            type: Number,
            required: true,
            trim: true,
        },
        category: {
            type: ObjectId,
            ref: 'Category',
            required: true,
        },
        quantity: {
            type: Number,
            required: false,
            trim: true,
        },
        photo: {
            data: Buffer,
            contentType: String,
            required: false,
        },
        shipping: {
            required: false,
            type: Boolean,
        },
    },
    { timestamps: true },
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
