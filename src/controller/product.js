const Product = require('../model/product')


exports.getall = (req, res) => {

    Product.get((err,data)=>{
        if (err) {
            console.log(err);
            res.send(err)
        } else res.send(data);
    });
};

exports.create = (req, res) => {

    // validation

    if (!req.body) {
        res.status(400).send({ message: " content can not be empty" })
        return;
    }
    if (!req.body.category || ! req.body.brand) {
        res.status(400).send({ message: " category and brand can not be empty" })
        return;
    }
    
       var product = new Product({
        productName: req.body.productName,
        category: req.body.category,
        brand: req.body.brand,
        uniqueid: req.body.uniqueid,
        sku: req.body.sku,
        description: req.body.description,
        status: req.body.status,
        productImage: req.body.productImage || false

    })

    Product.create(product, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the users."
            });
        else res.send(data);
    })
}

// update the Product

exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    Product.update(req.query.id, req.body, (err, data) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else res.send(data);
    }
    );
};

// delete the Product

exports.delete = (req, res) => {
    Product.remove(req.query.id, (err, data) => {
        if (err) {
            res.send(err)
        } else res.send({ message: `manufacturer was deleted successfully!` });
    });
};

exports.getbyId = (req, res) => {

    Product.getbyId(req.query.id, (req, res))
}