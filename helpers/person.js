const bcrypt = require("bcrypt");

exports.generateHash = function(password) {
    return bcrypt.hash(password, 10)
    .then(hash => {
        password = hash;
    })
    .catch(err => { 
        throw new Error(); 
    });
}