'use strict';

const bcrypt = require("bcrypt");
const response = require('../responses/response');
const Person = require('../models').persons;
const config = require('../config/credential');
const jwt = require('jsonwebtoken')

module.exports = {
    getAllPersons(req, res) {
        console.log("disini", req.currUser.userID)
        return Person
            .findAll({
                attributes: ['id', 'name', 'email']
            })
            .then(persons => response.ok(persons, res, 200))
            .catch(error => res.status(400).json(error));
    },

    registerPerson(req, res) {
        let name = req.body.name;
        let email = req.body.email;
        let password = req.body.password;

        bcrypt.hash(password, 10).then(function(hash) {
            console.log(hash)
            return Person
                .create({
                    name: name,
                    email: email,
                    password: hash
                })
                .then(person => response.ok(person, res, 201))
                .catch(error => res.status(400).json(error));
        });
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
               
                bcrypt.compare(password, data.password).then(function(result) {
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