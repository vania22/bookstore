require('dotenv').config();

const User = require('../models/user');
const braintree = require('braintree');

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

exports.generateToken = (req, res) => {
    gateway.clientToken.generate({}, (err, response) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(response);
        }
    });
};

exports.processPayment = (req, res) => {
    let clientNonce = req.body.paymentMethodNonce;
    let amount = req.body.price;

    let newTransaction = gateway.transaction.sale(
        {
            amount,
            paymentMethodNonce: clientNonce,
            options: {
                submitForSettlement: true,
            },
        },
        (err, result) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(result);
            }
        },
    );
};
