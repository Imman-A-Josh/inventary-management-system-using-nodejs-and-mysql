const Purchase = require('../model/purchase')


exports.getall = async (req, res) => {

    Purchase.get(req, res);
};

exports.create = (req, res) => {

    // validation

    if (!req.body) {
        res.status(400).send({ message: " content can not be empty" })
    }


    var purchase = new Purchase({
        companyName: req.body.companyName,
        purchaseOrderNumber: req.body.purchaseOrderNumber,
        address: req.body.address,
        paymentMode: req.body.paymentMode,
        paymentStatus: req.body.paymentStatus,

    })

    Purchase.create(purchase, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the users."
            });
        else res.send(data);
    })
}

exports.afterClickingTheSubmitButton=(req,res)=>{
    Purchase.SubmitButton(req.query.purchaseOrderNumber,req.user.id,(err,data)=>{
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
    Purchase.update(req.query.id, req.body, (err, data) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else res.send(data);
    }
    );
};

// delete the Product

exports.delete = (req, res) => {
    Purchase.remove(req.query.id, (err, data) => {
        if (err) {
            res.send(err)
        } else res.send({ message: `manufacturer was deleted successfully!` });
    });
};

exports.getbyId = (req, res) => {

    Purchase.getbyId(req.query.id, (req, res))
}

exports.invoice = (req, res) => {

    Purchase.invoice(req.query.id, (err,data)=>{
        if (err) {
            console.log(err);
            res.send(err)
        } else res.send(data);
    });
};