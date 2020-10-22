const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

// Cart Item schema
const cartItemSchema = new mongoose.Schema(
    {
        product: { type: ObjectId, ref: 'Product' },
        name: String,
        price: Number,
        count: Number,
    },
    { timestamps: true },
);

const CartItem = mongoose.model('CartItem', cartItemSchema);

// Order schema
const orderSchema = new mongoose.Schema(
    {
        products: [cartItemSchema],
        transactionId: {},
        amount: Number,
        address: String,
        status: {
            type: String,
            default: 'Not Processed',
            enum: [
                'Not Processed',
                'Processing',
                'Shipped',
                'Delivered',
                'Cancelled',
            ],
        },
        updated: Date,
        user: { type: ObjectId, ref: 'User' },
    },
    { timestamps: true },
);

const Order = mongoose.model('Order', orderSchema);

module.exports = { Order, CartItem };
