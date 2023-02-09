const sql = require('./connection')


var Brand = function (brand) {
  this.id = brand.id;
  this.brandName=brand.brandName;
  this.brandDescription=brand.brandDescription;
  this.brandImage=brand.brandImage;
  
};

Brand.get = (result) => {
  sql.query(`SELECT * from brand`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
  }
    else {
      console.log(res);
      result(null,res);
      
    }
  });
};


// add the Brand

Brand.create = (data, result) => {
 sql.query("INSERT INTO brand SET ?", data, (err, res) => {
      if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
      }

      console.log("create the new user: ", { id: res.insertId, ...data });
      result(null, { id: res.insertId, ...data });
  });
}


Brand.update = (id, data, result) => {
  sql.query(
      `UPDATE brand SET brandName = '${data.brandName}', brandDescription = '${data.brandDescription}',brandImage='${data.brandImage}' WHERE id = ?`,
      (err, res) => {
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

          console.log("updated data: ", { id: id, ...data });
          result(null, { id: id, ...data });
      }
  );
};

// delete the Brand

Brand.remove = (id, result) => {
  sql.query("DELETE FROM brand WHERE id = ?", id, (err, res) => {
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

      console.log("delete product with id: ", id);
      result(null, res);
  });
};


Brand.getbyId = (id, res) => {

  sql.query(`select * from brand where id='${id}'`, (err, data) => {
      if (err) {
          console.log(err);
          res.send(err)
      }
      console.log(data);
      res.send(data)
  });
}


module.exports=Brand;