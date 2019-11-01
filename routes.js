'use strict';
const personController = require('./controllers/person');
const productController = require('./controllers/product');
const cartController = require('./controllers/cart');
const orderController = require('./controllers/order');
const auth = require('./middlewares/auth');
const multer = require("multer");

const upload = multer({
    dest: "public/images"
});

module.exports = function(app) {
    app.post('/auth/signup', personController.registerPerson);
    app.post('/auth/login', personController.login);
    app.get('/v1/persons', auth.authorization, personController.getAllPersons);

    app.use('/v1/products', auth.authorization);
    app.get('/v1/products', productController.getAllProducts);
    app.get('/v1/products/:id', productController.getDetailProduct);
    app.post('/v1/products', upload.single('file'), productController.createProduct);
    app.patch('/v1/products/:id', productController.updateProduct);
    app.delete('/v1/products/:id', productController.deleteProduct);

    app.get("/public/images/:file", auth.authorization, productController.showImage);

    app.get("/v2/products", auth.authorization, productController.apiV2);
    
    app.use('/v1/carts', auth.authorization);
    app.post('/v1/carts', cartController.createCart); //createCart add new item

    app.use('/v1/orders', auth.authorization);
    app.get('/v1/orders', orderController.getAllOrders); //getAllOrder by current user
    app.get('/v1/orders/:id', orderController.getDetailOrder); //getDetailOrder cart 
    app.post('/v1/orders', orderController.createOrder); // create order
    app.patch('/v1/orders/:id', orderController.updateOrder); //updateOrder update status and total order
};