'use strict';

const response = require('../response/response');
const Person = require('../models').Person;
const con = require('../connection/conn');

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
        console.log("disini")
        return Person
            .findAll({
                attributes: ['id', 'name', 'phone']
            })
            .then(persons => response.ok(persons, res))
            .catch(error => res.status(400).send(error));
    },
};