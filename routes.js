'use strict';
const personController = require('./controllers/person');
const productController = require('./controllers/product');
const auth = require('./middlewares/auth');
const multer = require("multer");

const upload = multer({
    dest: "public/images"
    // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

module.exports = function(app) {
    var person = require('./controllers/person');

    // router.route('/')
    //     .get(person.index);

    // router.route('/persons')
    //     .get(person.persons);

    // app.use('/api/v1/person');
    // app.route('/api/v1/person')
    app.post('/auth/signup', personController.registerPerson);
    app.post('/auth/login', personController.login);
    app.get('/api/v1/persons', auth.authorization, personController.getAllPersons);

    app.use('/v1/products', auth.authorization);
    app.get('/v1/products', productController.getAllProducts);
    app.get('/v1/products/:id', productController.getDetailProduct);
    app.post('/v1/products', upload.single('file'), productController.createProduct);
    app.patch('/v1/products/:id', productController.updateProduct);
    app.delete('/v1/products/:id', productController.deleteProduct);

    app.get("/public/images/:file", auth.authorization, productController.showImage);

    app.get("/v2/products", auth.authorization, productController.apiV2);
};