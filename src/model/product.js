const sql = require("./connection");

var Product = function (product) {
  this.id = product.id;
  this.productName = product.productName;
  this.category = product.category;
  this.brand = product.brand;
  this.uniqueid = product.uniqueid;
  this.sku = product.sku;
  this.description = product.description;
  this.status = product.status;
  this.productImage = product.productImage;
  this.barCode = product.barCode;
};

Product.get = (result) => {
  // let query = `SELECT * FROM product `;
  let query =
    "SELECT productName,(SELECT categoryName FROM category WHERE category.id = product.category) AS category,(SELECT brandName FROM brand WHERE brand.id = product.brand) AS brand,uniqueid,sku,description,status,productImage,barCode FROM product";
  sql.query(query, (err, res) => {
    if (err) {
      // res.send(err);
      console.log(err);
      result(null, err);
      return;
    } else {
      console.log(res);
      result(null, res);
    }
  });
};

Product.update = (id, data, result) => {
  sql.query(
    `UPDATE product SET productName = '${data.productName}', category = '${data.category}',brand='${data.brand}',uniqueid='${data.uniqueid}',sku = '${data.sku}',quantity='${data.quantity}',description='${data.description}',tax='${data.tax}',discountType='${data.discountType}', price = '${data.price}', status ='${data.status}', productImage ='${data.productImage}', barCode = '${data.barCode}' WHERE id = ?`,
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

Product.remove = (id, result) => {
  sql.query("DELETE FROM product WHERE id = ?", id, (err, res) => {
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

Product.getbyId = (id, res) => {
  sql.query(`select * from product where id='${id}'`, (err, data) => {
    if (err) {
      console.log(err);
      res.send(err);
    }
    console.log(data);
    res.send(data);
  });
};

Product.create = (data, result) => {
  var insertquery1 = `select id from category where categoryName='${data.category}'`;
  var insertquery2 = `select id from brand where brandName='${data.brand}'`;
  sql.query(insertquery1, (err, res) => {
    if (err) {
      result(null, err);
      console.log(err);
      return;
    } else {
      var category = res.pop().id;
      console.log(category);

      sql.query(insertquery2, (err, res2) => {
        if (err) {
          result(null, err);
          console.log(err);
          return;
        } else {
          var brand = res2.pop().id;

          console.log(brand);

          var uniqueid = Math.floor(Math.random() * 90000) + 10000;

          var barCode = Math.floor(Math.random() * 900000000000) + 100000000000;

          // console.log(digits);

          var insertquery = `insert into product (productName,category,brand,uniqueid,sku,description,status,productImage,barCode) values('${data.productName}','${category}','${brand}','${uniqueid}','${data.sku}','${data.description}','${data.status}','${data.productImage}','${barCode}')`;

          sql.query(insertquery, (err, res) => {
            if (err) {
              result(null, err);
              return;
            }
            if (res == 0) {
              result(null, err);
            } else {
              console.log(res);
              result(null, {
                id: res.insertId,
                data,
                barCode: barCode,
                uniqueid: uniqueid,
              });
            }
          });
        }
      });
    }
  });
};

module.exports = Product;

