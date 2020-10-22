const { Order, CartItem } = require('../models/order');
const User = require('../models/user');

exports.create = (req, res, next) => {
    req.body.order.user = req.profile;

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

exports.addUserOrderHistory = (req, res, next) => {
    const userId = req.profile._id;
    const history = [];
    req.body.order.products.forEach((item) => {
        history.push({
            _id: item._id,
            name: item.name,
            description: item.description,
            category: item.category,
            count: item.count,
            transactionId: req.body.order.transactionId,
            price: item.price * item.count,
        });
    });

    // console.log(userId);

    User.findByIdAndUpdate(
        { _id: userId },
        { $push: { history } },
        { new: true },
        (err, result) => {
            if (err) {
                return res.status(400).json(error);
            }

            next();
        },
    );
};
