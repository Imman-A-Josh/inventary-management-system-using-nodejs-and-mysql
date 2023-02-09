const Sales_order = require('../model/sale_order')


exports.getall = async (req, res) => {

    Sales_order.get((err, data)=>{
        if (err)
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the users."
        });
    else res.send(data);
    });
};

exports.create = (req, res) => {

    // validation

    if (!req.body) {
        res.status(400).send({ message: " content can not be empty" })
    }

    var sales_order = new Sales_order({
        product: req.body.product,
        quantity: req.body.quantity,
        mrp: req.body.mrp,
        unit: req.body.unit,
        price: req.body.price,
        discount: req.body.discount,
        tax: req.body.tax,
        total: req.body.total || false
    }) 

    Sales_order.create(sales_order,req.query.id, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the users."
            });
        else res.send(data);
    })
}

