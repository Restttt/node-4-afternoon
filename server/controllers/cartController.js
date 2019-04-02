const swag = require('../models/swag.js');

module.exports = {
    add: (req, res) => {
        const { id } = req.query

        const swagIndex = swag.findIndex(item => +item.id === +id);
        const cartIndex = req.session.user.cart.findIndex(item => +item.id === +id);
        if (cartIndex === -1) {
            req.session.user.cart.push(swag[swagIndex]);
            req.session.user.total += swag[swagIndex].price;
            res.status(200).send(req.session.user);
        } else {
            res.status(200).send(req.session.user)
        }
    },
    delete: (req, res) => {
        const { id } = req.query

        const index = req.session.user.cart.findIndex(item => +item.id === +id);
        const swagIndex = swag.findIndex(item => +item.id === +id);

        req.session.user.cart.splice(index, 1);
        req.session.user.total = req.session.user.total - swag[swagIndex].price;

        res.status(200).send(req.session.user);
    },
    checkout: (req, res) => {
        req.session.user.cart = [];
        req.session.user.total = 0;
        res.status(200).send(req.session.user);
    }
}