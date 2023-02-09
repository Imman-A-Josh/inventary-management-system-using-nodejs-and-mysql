const Sales = require('../model/sales')


exports.getall = async (req, res) => {

    Sales.get((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the users."
            });
        else res.send(data);
    })
};

exports.create = (req, res) => {

    // validation

    if (!req.body) {
        res.status(400).send({ message: " content can not be empty" })
    }


    var sales = new Sales({
        customerName: req.body.customerName,
        saleDate: req.body.saleDate,
        address: req.body.address,
        supplier: req.body.supplier,
        paymentStatus: req.body.paymentStatus,
        paymentMode: req.body.paymentMode
    })
   
    Sales.create(sales,req.user, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the users."
            });
        else res.send(data);
    })
}

exports.afterClickingTheSubmitButton = (req, res) => {
    Sales.SubmitButton(req.query.so, req.user.id, (err, data) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else res.send(data);
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
    Sales.update(req.query.id, req.body, (err, data) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else res.send(data);
    }
    );
};

// delete the Product

exports.delete = (req, res) => {
    Sales.remove(req.query.id, (err, data) => {
        if (err) {
            res.send(err)
        } else res.send({ message: `manufacturer was deleted successfully!` });
    });
};

exports.getbyId = (req, res) => {

    Sales.getbyId(req.query.id, (req, res))
}