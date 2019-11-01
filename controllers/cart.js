'use strict';

const response = require('../responses/response');
const Product = require('../models').products;
const Order = require('../models').orders;
const Cart = require('../models').carts;

module.exports = {
    createCart(req, res) {
        let productId = req.query.product_id;
        let orderId = req.query.order_id;
        let quantity = req.body.quantity;

        return Order
            .findAll({
                where: {
                    id: orderId
                }
            })
            .then(orderAvailable => {
                let data = orderAvailable[0].dataValues;

                return Product
                    .findAll({
                        where: {
                            id: productId
                        }
                    })
                    .then(productAvailable => {
                        let dataProd = productAvailable[0].dataValues;

                        return Cart
                            .create({
                                productId: dataProd.id,
                                orderId: data.id,
                                quantity: quantity,
                                price: dataProd.price
                            })
                            .then(cart => response.ok(cart, res, 201))
                            .catch(error => res.status(400).json(error));
                    })
                    .catch(error => res.status(400).json(error));
            })
            .catch(error => res.status(400).json(error));
    },

    updateProduct(req, res) {
        let id = req.params.id;
        let name = req.body.name;
        
        return Product
            .update(
                {
                    name: name
                },
                {
                    where: {
                        id: id
                    }
                }
            )
            .then(updatedProduct => {

                return Product
                    .findAll({
                        where: {
                            id: id
                        }
                    })
                    .then(updated => response.ok(updated, res, 201))
                    .catch(error => res.status(400).json(error))
            })
            .catch(error => res.status(400).json(error));        
    },

    deleteProduct(req, res) {
        let id = req.params.id;

        return Product
            .destroy({
                where: {
                    id: id
                }
            })
            .then(deletedProduct => response.deleted(id + ' deleted', res, 200))
            .catch(error => res.status(400).json(error))
    },
};