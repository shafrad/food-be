'use strict';

const bcrypt = require("bcrypt");
const response = require('../response/response');
const Product = require('../models').products;
const config = require('../config/credential');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

module.exports = {
    getAllProducts(req, res) {
        console.log("disini", req.currUser.userID)
        return Product
            .findAll({
                attributes: ['id', 'name', 'price', 'imageurl']
            })
            .then(products => response.ok(products, res, 200))
            .catch(error => res.status(400).json(error));
    },

    getDetailProduct(req, res) {
        let id = req.params.id

        return Product
            .findAll({
                where: {
                    id: id
                }
            })
            .then(product => response.ok(product, res, 200))
            .catch(error => res.status(400).json(error));
    },

    createProduct(req, res) {
        let name = req.body.name;
        let price = req.body.price;
        
        const tempPath = req.file.path;
        const targetPath = path.join(__dirname, "../public/images/" + req.file.originalname);
        console.log('dfwdf', targetPath)

        if (path.extname(req.file.originalname).toLowerCase() !== ".pdf") {
            fs.rename(tempPath, targetPath, err => {
                if (err) return res.status(400).json(err);

                let imageurl = req.protocol + "://" + req.get('host') + "/public/images/" + req.file.originalname;
                console.log(imageurl)
                return Product
                    .create({
                        name: name,
                        price: price,
                        imageurl: imageurl
                    })
                    .then(product => response.ok(product, res, 201))
                    .catch(error => res.status(400).json(error));
            });
        } else {
            fs.unlink(tempPath, err => {
                if (err) return res.status(400).json(err);

                res.status(400).contentType("text/plain").json({ 'message': 'Only image files are allowed!' });
            });
        }
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

    showImage(req, res) {
        let file = req.params.file

        res.sendFile(path.join(__dirname, "../public/images/" + file));
    },

    apiV2(req, res) {
        return res.status(200).json({ 'message': 'Hello there' })
    },
};