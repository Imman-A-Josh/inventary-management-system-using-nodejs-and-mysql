module.exports = app => {
    const Sales_order = require("../controller/sale_order")

    const router=require('express').Router();

    router.get('/product', Sales_order.getall);    // get all the fields

    router.post('/product/', Sales_order.create);    // add the Purchase


    app.use('/api/sales', router);
}

