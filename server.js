var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    controller = require('./controllers/person');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));

var models = require('./models');

// models.sequelize.sync().then(function() {
//     console.log('Database working fine');
// }).catch(function(err) {
//     console.log('Something went wrong with your database', err);
// });

var routes = require('./routes');
routes(app);

app.listen(port);
console.log('RESTful API server started on: ' + port);