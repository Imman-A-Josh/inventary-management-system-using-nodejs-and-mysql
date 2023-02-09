const Vendor = require('../model/vendor')


exports.getall = async (req, res) => {

    Vendor.get((err,data)=>{
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
    
    var vendor = new Vendor({
        vendorName:req.body.vendorName,
        companyName: req.body.companyName,
        vendorAddress: req.body.vendorAddress,
        vendorEmail: req.body.vendorEmail,
        vendorContactNumber: req.body.vendorContactNumber,
        website: req.body.website,
        GSTIN: req.body.GSTIN,
        contactPersonName :req.body.contactPersonName,
        emailAddress: req.body.emailAddress,
        workContactNumber: req.body.workContactNumber,
        personalContactNumber: req.body.personalContactNumber,
        designation: req.body.designation || false

    })

    Vendor.create(vendor, (err, data) => {
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
    Vendor.update(req.query.id, req.body, (err, data) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else res.send(data);
    }
    );
};

// delete the Product

exports.delete = (req, res) => {
    Vendor.remove(req.query.id, (err, data) => {
        if (err) {
            res.send(err)
        } else res.send({ message: `manufacturer was deleted successfully!` });
    });
};

exports.getbyId = (req, res) => {

    Vendor.getbyId(req.query.id, (req, res))
}