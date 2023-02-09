const sql = require('./connection')


var Vendor = function (vendor) {
  this.id = vendor.id;
  this.vendorName = vendor.vendorName;
  this.companyName = vendor.companyName;
  this.vendorAddress = vendor.vendorAddress;
  this.vendorEmail = vendor.vendorEmail;
  this.vendorContactNumber = vendor.vendorContactNumber;
  this.website = vendor.website;
  this.GSTIN = vendor.GSTIN;
  this.contactPersonName = vendor.contactPersonName;
  this.emailAddress = vendor.emailAddress;
  this.workContactNumber = vendor.workContactNumber;
  this.personalContactNumber = vendor.personalContactNumber;
  this.designation = vendor.designation
};


Vendor.get = (result) => {
  // let query = `SELECT * FROM Vendor `;
  let query = "SELECT vendorName,contactPersonName,(SELECT companyName FROM manufacturer WHERE manufacturer.id = Vendor.companyName) AS companyName,vendorEmail,vendorContactNumber FROM Vendor"

  sql.query(query, (err, res) => {
    if (err) {
      console.log(err);
      result(null,err)
      return
    }
    else {
      console.log(result);
      result(null,res)
    }
  });

};


// add the Vendor

Vendor.create = (data, result) => {
  console.log(data);
  sql.query("INSERT INTO Vendor SET ?", data, (err, res) => {   // 
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("++++++++++++++++++++++++++++++++++++++++++");
    console.log("create the new user: ", { id: res.insertId, ...data });
    result(null, { id: res.insertId, ...data });
  });
}


Vendor.update = (id, data, result) => {
  sql.query(
    `UPDATE Vendor SET companyName = '${data.companyName}', vendorAddress = '${data.vendorAddress}',vendorEmail='${data.vendorEmail}',vendorContactNumber='${data.vendorContactNumber}',website = '${data.website}',GSTIN='${data.GSTIN}',emailAddress='${data.emailAddress}',workContactNumber='${data.workContactNumber}',personalContactNumber='${data.personalContactNumber}', designation = '${data.designation}' WHERE id = ?`,
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

// delete the Vendor

Vendor.remove = (id, result) => {
  sql.query("DELETE FROM Vendor WHERE id = ?", id, (err, res) => {
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


Vendor.getbyId = (id, res) => {

  sql.query(`select * from Vendor where id='${id}'`, (err, data) => {
    if (err) {
      console.log(err);
      res.send(err)
    }
    console.log(data);
    res.send(data)
  });
}

module.exports = Vendor;