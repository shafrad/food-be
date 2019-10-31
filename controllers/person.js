'use strict';

const bcrypt = require("bcrypt");
const response = require('../response/response');
const Person = require('../models').Person;
const con = require('../connection/conn');
const helper = require('../helpers/person');
const config = require('../config/credential');
const jwt = require('jsonwebtoken')

exports.persons = function(req, res) {
    con.query('SELECT * FROM person', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.index = function(req, res) {
    response.ok("Hello from the Node JS RESTful side!", res)
};

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
            // Store hash in your password DB.
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