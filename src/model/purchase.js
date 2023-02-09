const sql = require('./connection')
const calculation = require('./calculation')



var Purchase = function (purchase) {
  this.id = purchase.id;
  this.companyName = purchase.companyName;
  this.purchaseOrderNumber = purchase.purchaseOrderNumber;
  this.address = purchase.address;
  this.paymentMode = purchase.paymentMode;
  this.paymentStatus = purchase.paymentStatus;
  this.products = purchase.products;
  this.totaltax = purchase.totaltax;
  this.totalDiscount = purchase.totalDiscount;
  this.grandTotal = purchase.grandTotal;
  this.postedBy = purchase.postedBy;
};


Purchase.get = (result) => {
  // let query = `SELECT * FROM Purchase `;
  let query = "SELECT id,(SELECT companyName FROM manufacturer WHERE manufacturer.id = Purchase.companyName) AS companyName,purchaseOrderNumber,address,paymentMode,paymentStatus FROM Purchase"
  sql.query(query, (err, res) => {
    if (err) {
      console.log(err);
      result(null, err)
      return
    }
    else {
      console.log(res);
      result(null, res)
    }
  });

};


// add the Product

Purchase.create = (data, result) => {
  sql.query(`select id from manufacturer where companyName='${data.companyName}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    else {

      var companyName = res.pop().id;
      console.log(companyName);

      let insertquery = `insert into Purchase (companyName,purchaseOrderNumber,address,paymentMode,paymentStatus) values('${companyName}','${data.purchaseOrderNumber}','${data.address}','${data.paymentMode}','${data.paymentStatus}')`;
      sql.query(insertquery, (err, res) => {   // 
        if (err) {
          // console.log(insertquery);
          console.log("error: ", err);
          result(err, null);
          return;
        }
        console.log("create the new user: ", { id: res.insertId, ...data });
        result(null, { id: res.insertId });
      })
    }
  });
}
Purchase.SubmitButton = (Order, postedBy, result) => {
  // sql.query(``)
  sql.query(`select * from Purchase_Order where purchaseOrderNumber='${Order}';select productId from Purchase_Order where purchaseOrderNumber='${Order}'`, async (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } else {
      let products = res[1].pop().productId
      console.log(products);
      let data = res[0];
      // let products=data.pop().productId;
      // console.log(products);

      var totalDiscount = await calculation.calculateTotalDiscount(data);
      console.log(totalDiscount);
      var totaltax = await calculation.calculateTotalTax(data);
      console.log(totaltax);
      var subTotal = await calculation.calculateSubTotal(data);
      console.log(subTotal);
      var grandTotal = await calculation.grandTotal(totalDiscount, totaltax, subTotal);
      console.log(grandTotal);
      sql.query(`Update Purchase set products='${products}',totalTax='${totaltax}',subTotal='${subTotal}',totalDiscount='${totalDiscount}',grandTotal='${grandTotal}',postedBy='${postedBy}',complete='true'`, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        } else {
          result(null, { res });
          // console.log(res);

        }
      })
    }
  });
}

Purchase.update = (id, data, result) => {
  sql.query(
    `UPDATE Purchase SET companyName = '${data.companyName}',purchaseOrderNumber='${data.purchaseOrderNumber}',address='${data.address}',paymentMode = '${data.paymentMode}',paymentStatus='${data.paymentStatus}',products='${data.products}',type='${data.type}',totaltax='${data.totaltax}', totalDiscount = '${data.totalDiscount}', grandTotal ='${data.grandTotal}', postedBy ='${data.postedBy}' WHERE id = ?`,
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

// delete the Product

Purchase.remove = (id, result) => {
  sql.query("DELETE FROM Purchase WHERE id = ?", id, (err, res) => {
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


Purchase.getbyId = (id, res) => {

  sql.query(`select * from Purchase where id='${id}'`, (err, data) => {
    if (err) {
      console.log(err);
      res.send(err)
    }
    console.log(data);
    res.send(data)
  });
}

Purchase.invoice = (id, result) => {
  sql.query(`select * from Purchase where id='${id}'`, (err, res1) => {
    if (err) {
      console.log(err);
      result(null, err)
    }
    else {
      data1 = res1.pop()
      var logi = (data1)
      // console.log(logi);

      sql.query(`select vendorName,(select companyName from manufacturer where manufacturer.id=Vendor.companyName) as companyName,vendorAddress,vendorEmail,vendorcontactNumber,website,GSTIN,contactPersonName,emailAddress,workContactNumber,personalContactNumber,designation from Vendor where id='${id}'`, (err, res2) => {
        if (err) {
          console.log(err);
          result(null, err)
        }
        else {
          // console.log(res2);
          var vision = res2.pop()
          var Data = vision.id
          sql.query(`select companyName from manufacturer where id='${Data}'`, (err, res4) => {
            if (err) throw err;
            data1.companyName = res4.pop()

            data1.companyName = vision;
            console.log(data1);
            sql.query(`select * from Purchase_Order where po='${id}'`, (err, res3) => {
              if (err) {
                console.log(err);
                result(err, null)
              } else {
                // console.log(res3);
                var leo = res3;
                result(null, { data: data1, productsDetails: leo })
              }

            })
          })
        }
      })
    }
  })

}

module.exports = Purchase;