const Purchase_order = require('../model/purchase_order')


exports.getall = async (req, res) => {

    Purchase_order.get((err, data)=>{
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

    var purchase_order = new Purchase_order({
        productId: req.body.productId,
        quantity: req.body.quantity,
        mrp: req.body.mrp,
        unit: req.body.unit,
        price: req.body.price,
        discount: req.body.discount,
        tax: req.body.tax,
        total: req.body.total || false
    }) 

    Purchase_order.create(purchase_order,req.query.id, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the users."
            });
        else res.send(data);
    })
}

