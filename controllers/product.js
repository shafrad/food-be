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

                // res
                // .status(200)
                // .contentType("text/plain")
                // .end("File uploaded!");
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

    registerPerson(req, res) {
        let name = req.body.name;
        let email = req.body.email;
        let password = req.body.password;

        bcrypt.hash(password, 10).then(function(hash) {
            // Store hash in your password DB.
            console.log(hash)
            return Person
                .create({
                    name: name,
                    email: email,
                    password: hash
                })
                .then(person => response.ok(person, res, 200))
                .catch(error => res.status(400).json(error));
        });

        // return Person
        //     .create({
        //         name: name,
        //         phone: phone,
        //         password: password
        //     })
        //     .then(person => response.created(person, res, 200))
        //     .catch(error => res.status(400).json(error));
    },

    login(req, res) {
        let email = req.body.email;
        let password = req.body.password;

        return Person
            .findAll({
                where: {
                    email: email
                }
            })
            .then( person => {
                let data = person[0].dataValues
                console.log(person[0].dataValues.password)
                // Load hash from your password DB.
                bcrypt.compare(password, data.password).then(function(result) {
                    // res == true
                    if(result) {
                        let token = jwt.sign({ userID : data.id}, config.security, {expiresIn: 24 * 60 * 60});
                        response.loggedIn(token, res, 200)
                    } else {
                        console.log("authentication failed. Password doesn't match")
                        res.status(400).json({ 'message': 'Email atau Password anda salah' })
                    }
                })
                .catch(error => res.status(400).json(error))
            })
            .catch(
                error => res.status(400).json(error)
            );
    },
};