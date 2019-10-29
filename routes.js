'use strict';
const personController = require('./controllers/person')

module.exports = function(app) {
    var person = require('./controllers/person');

    // router.route('/')
    //     .get(person.index);

    // router.route('/persons')
    //     .get(person.persons);

    app.get('/api/person', personController.getAllPersons);
};