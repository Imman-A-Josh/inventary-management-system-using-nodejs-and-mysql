const Category = require('../model/category')


exports.getall = async (req, res) => {

    Category.get((err, data)=>{
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

    if (!req.body.categoryName) {
        res.status(400).send({ message: " categoryName can not be empty" })
    }


    var category = new Category({
        categoryName: req.body.categoryName,
        categoryCode: req.body.categoryCode,
        description: req.body.description
    })

    Category.create(category, (err, data) => {
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
    Category.update(req.query.id, req.body, (err, data) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else res.send(data);
    }
    );
};

// delete the Product

exports.delete = (req, res) => {
    Category.remove(req.query.id, (err, data) => {
        if (err) {
            res.send(err)
        } else res.send({ message: `manufacturer was deleted successfully!` });
    });
};

exports.getbyId = (req, res) => {

    Category.getbyId(req.query.id, (req, res))
}