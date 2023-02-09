
module.exports = app => {
    const Purchase_order = require("../controller/purchase_order")

    const router=require('express').Router();

    router.get('/product', Purchase_order.getall);    // get all the fields

    router.post('/product/', Purchase_order.create);    // add the Purchase


    app.use('/api/purchase', router);
}

