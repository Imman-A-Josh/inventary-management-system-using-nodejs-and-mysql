
module.exports = app => {
    const Product = require("../controller/product")

    app.get('/api/products', Product.getall);    // get all the fields

    app.get('/api/product/', Product.getbyId);   // get product by id

    app.post('/api/product', Product.create);    // add the product

    app.patch('/api/product/', Product.update);  // update by id

    app.delete('/api/product/', Product.delete);  // delete product by id
}
