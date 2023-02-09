const Brand = require('../model/brand')


exports.getall = (req, res) => {

  Brand.get((err,data)=>{
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the users."
      });
    else res.send(data);
  })
};


exports.newone = (req, res) => {

  // validation

  if (!req.body) {
    res.status(400).send({ message: " content can not be empty" })
  }

  var brand = new Brand({
    brandName: req.body.brandName,
    brandDescription: req.body.brandDescription,
    brandImage: req.body.brandImage
  })

  Brand.create(brand, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the users."
      });
    else res.send(data);
  })
}

// update the Brand

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  Brand.update(req.query.id, req.body, (err, data) => {
    if (err) {
      console.log(err);
      res.send(err)
    } else res.send(data);
  }
  );
};

// delete the Brand

exports.delete = (req, res) => {
  Brand.remove(req.query.id, (err, data) => {
    if (err) {
      res.send(err)
    } else res.send({ message: `manufacturer was deleted successfully!` });
  });
};

exports.getbyId = (req, res) => {

  Brand.getbyId(req.query.id, (req, res))
}
