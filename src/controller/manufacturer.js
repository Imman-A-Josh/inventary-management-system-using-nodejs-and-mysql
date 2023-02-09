const Manufacturer = require('../model/manufacturer')


exports.getall = async (req, res) => {

   Manufacturer.get((err, data)=>{
      if (err) {
         console.log(err);
         res.send("Something error is Occured");
      }
      else res.send(data);
   })
};

exports.create = (req, res) => {

   var manufacturer = new Manufacturer({
      companyName: req.body.companyName,
      location: req.body.location,
      phone: req.body.phone,
      email: req.body.email,
      website: req.body.website,
      establishment: req.body.establishment,
      brand: req.body.brand

   })

   Manufacturer.create(manufacturer, (err, data) => {
      if (err) {
         console.log(err);
         res.send("Something error is Occured");
      }
      else res.send(data);
   })
}

// update the Manufacturer

exports.update = (req, res) => {

   // Validate Request
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!"
      });
   }
   Manufacturer.update(req.query.id,req.body,(err, data) => {
         if (err) {
            console.log(err);
            res.send(err)
         } else res.send(data);
      }
   );
};


//delete method
exports.delete = (req, res) => {
   Manufacturer.remove(req.query.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found manufacturer with id ${req.params.id}.`
            });
         } else {
            res.status(500).send({
               message: "Could not delete manufacturer with id " + req.params.id
            });
         }
      } else res.send({ message: `manufacturer was deleted successfully!` });
   });
};

// get by id

exports.getbyId=(req,res)=>{

   Manufacturer.getbyId(req.params.id,(req,res))
}