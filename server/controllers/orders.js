const { Order } = require('../models/order');

exports.create = (req, res, next) => {
    req.body.order.user = req.profile;

    const order = new Order(req.body.order);

    order.save((error, data) => {
        if (error) {
            return res.status(400).json({
                error: error.message,
            });
        } else {
            return res.json(data);
        }
    });
};

exports.list = (req, res) => {
    let skip = parseInt(req.query.skip);

    Order.find()
        .sort([['createdAt', 'desc']])
        .skip(skip)
        .limit(6)
        .exec((err, orders) => {
            if (err) {
                return res.status(500).json(err);
            }

            return res.json(orders);
        });
};

exports.updateStatus = (req, res) => {
    const orderId = req.body.orderId;
    const newStatus = req.body.status;

    Order.findByIdAndUpdate(
        { _id: orderId },
        { status: newStatus },
        { new: true },
        (err, result) => {
            if (err) {
                return res.status(500).json(error);
            }

            return res.json(result);
        },
    );
};
