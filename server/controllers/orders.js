const { Order, CartItem } = require('../models/order');

exports.create = (req, res) => {
    req.body.order.user = req.profile;
    console.log(req.body.order);

    const order = new Order(req.body.order);

    order.save((error, data) => {
        if (error) {
            console.log(error);
            return res.status(400).json({
                error: error.message,
            });
        }
        res.json(data);
    });
};
