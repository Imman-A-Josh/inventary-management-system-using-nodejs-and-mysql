const sql = require('./connection')


var Manufacturer = function (manufacturer) {
  this.id = manufacturer.id;
  this.companyName = manufacturer.companyName;
  this.location = manufacturer.location;
  this.phone = manufacturer.phone;
  this.email = manufacturer.email
  this.website = manufacturer.website;
  this.establishment = manufacturer.establishment;
  this.brand = manufacturer.brand;
};

Manufacturer.get = (result) => {
  sql.query(`SELECT id,companyName,location,phone,email,(select brandName from brand where brand.id = manufacturer.brand) as brand FROM manufacturer`, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }
    else {
      console.log(res);
    result(null,res)
    }
  });
};

// get by id

Manufacturer.getbyId=(id,res)=>{

  sql.query(`select * from manufacturer where id='${id}'`,(err,data)=>{
      if (err) {
          console.log(err);
          res.send(err)
      }
      console.log(data);
      res.send(data)
  });
}

Manufacturer.create = (index, result) => {
  console.log(index);
  sql.query(`select id from brand where brandName='${index.brand}'`,(err,res)=>{
    if(err){
      console.log(err);
      result(err, null);
      return;
    }
    if(res == 0){
      console.log(err);
      result(err, null);
      return;
    }
    else{
      var brandid=res.pop().id

      var query=`Insert into manufacturer(companyName,location,phone,email,website,establishment,brand) values ('${index.companyName}','${index.location}','${index.phone}','${index.email}','${index.website}','${index.establishment}','${brandid}')`

  sql.query(query, (err, res) => {          // "Insert into manufacturer set ?"
    if (err) {
      console.log(err);
      result(err, null);
      return;
    } else {
      console.log("SuccessFully Added the data");
      result(null, { id: res.insertId, ...index });
    }
    })
  }
})
}

//update 

Manufacturer.update = (id, data, result) => {

 sql.query(`UPDATE manufacturer SET companyName='${data.companyName}', location='${data.location}',phone= '${data.phone}', email='${data.email}',website='${data.website}',establishment='${data.establishment}',brand='${data.brand}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("updated Manufacturer: ", { id: id, ...data });
    result(null, { id: id, ...data });
  }
  );
};

Manufacturer.remove = (id, result) => {
  
  sql.query("DELETE FROM manufacturer WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("delete manufacturer with id: ", id);
    result(null, res);
  });
};


module.exports = Manufacturer;