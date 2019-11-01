'use strict';

const response = require('../responses/response');
const Product = require('../models').products;
const Order = require('../models').orders;
const Cart = require('../models').carts;

module.exports = {
    getAllOrders(req, res) {
        let currUser = req.currUser

        return Order
            .findAll({
                where: {
                    personId: currUser.userID
                }
            })
            .then(orders => response.ok(orders, res, 200))
            .catch(error => res.status(400).json(error));
    },

    getDetailOrder(req, res) {
        let id = req.params.id

        return Cart
            .findAll({
                where: {
                    orderId: id
                }
            })
            .then(carts => response.ok(carts, res, 200))
            .catch(error => res.status(400).json(error));
    },

    createOrder(req, res) {
        let currUser = req.currUser;
        let state = req.body.state;
        let completedAt = req.body.completed_at;
        let productId = req.query.product_id;
        let quantity = req.body.quantity;

        return Order
            .create({
                state: state,
                personId: currUser.userID,
                completedAt: completedAt
            })
            .then(order => {
                return Product
                    .findAll({
                        where: {
                            id: productId
                        } 
                    })
                    .then(productAvailable => {
                        let data = productAvailable[0].dataValues;

                        return Cart
                            .create({
                                productId: data.id,
                                quantity: quantity,
                                orderId: order.id,
                                price: data.price
                            })
                            .then(cart => response.ok(cart, res, 201))
                            .catch(error => res.status(400).json(error));
                    })
                    .catch(error => res.status(400).json(error));
            })
            .catch(error => res.status(400).json(error));
    },

    updateOrder(req, res) {
        let id = req.params.id;
        let state = req.body.state;

        return Cart
            .findAll({
                where: {
                    orderId: id
                }
            })
            .then(carts => {
                let data = carts[0];
                let i;
                let total = 0;

                for (i = 0; i < carts.length; i++) {
                    if (carts[i].dataValues.quantity > 1) {
                        total += parseInt(carts[i].dataValues.price) * parseInt(carts[i].dataValues.quantity);
                    } else {
                        total += parseInt(carts[i].dataValues.price);
                    }
                }
                console.log(total, 'total')
                return Order
                    .update(
                        {
                            total: total,
                            state: state
                        },
                        {
                            where: {
                                id: id
                            }
                        }
                    )
                    .then(updatedOrder => {
                        return Order
                            .findAll({
                                where: {
                                    id: id
                                },
                            })
                            .then(updated => response.ok(updated, res, 201))
                            .catch(error => res.status(400).json(error));
                    })
                    .catch(error => res.status(400).json(error));
            })
            .catch(error => res.status(400).json(error));      
    },
};