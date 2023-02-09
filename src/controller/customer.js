const Customer = require('../model/customer')


exports.getall = async (req, res) => {
    Customer.get((err, data)=>{
        if (err)
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the users."
        });
    else res.send(data);
    });
};

exports.newone = (req, res) => {

    // validation

    if (!req.body) {
        res.status(400).send({ message: " content can not be empty" })
    }

    var customer = new Customer({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        type: req.body.type,
        GSTno: req.body.GSTno,
        postedBy: req.user.id
    })

    Customer.create(customer, (err, data) => {
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
    Customer.update(req.query.id, req.body, (err, data) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else res.send(data);
    }
    );
};

// delete the Product

exports.delete = (req, res) => {
    Customer.remove(req.query.id, (err, data) => {
        if (err) {
            res.send(err)
        } else res.send({ message: `manufacturer was deleted successfully!` });
    });
};

exports.getbyId = (req, res) => {

    Customer.getbyId(req.query.id, (req, res))
}