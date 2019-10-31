const response = require('../response/response');
const Person = require('../models').Person;
const config = require('../config/credential');
const jwt = require('jsonwebtoken')
let salt = config.security;
console.log(salt);

module.exports = {
    
    authorization(req, res, next) {
        var token = req.headers['authorization'];
        token = token.split(' ')
        var flag = true;

        if(token[1] == null || token[1] == ''){
            flag = false;
        }
        
        if(flag){
        jwt.verify(token[1], salt, function (err, decoded) {
            // body...
            if (err) {
                res.status(401).json("Authentication failed");
            } else {
                req.currUser = decoded;
                return next();
            }
        });
        } else {
            res.status(401).json("Authentication failed");
        }    
    }
}