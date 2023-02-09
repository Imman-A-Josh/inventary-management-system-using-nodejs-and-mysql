const bcrypt = require("bcrypt");

const sql = require("../model/connection");

const util = require("util");
const query = util.promisify(sql.query).bind(sql);

var User = function (user) {
  this.id = user.id;
  this.username = user.username;
  this.password = user.password;
  this.token = user.token;
  this.role = user.role;
};

User.get = (req, res) => {
  let query = `SELECT * FROM Users `;
  sql.query(query, (err, result) => {
    if (err) {
      res.send(err);
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
};

User.getbyId = (id, res) => {
  sql.query(`select * from Users where id='${id}'`, (err, data) => {
    if (err) {
      console.log(err);
      res.send(err);
    }
    console.log(data);
    res.send(data);
  });
};

// new User added

User.newuser = (newuser, result) => {
  sql.query(
    `insert into Users (username,password) values('${newuser.username}','${newuser.password}')`,
    (err, res) => {
      if (err) {
        console.log(err);
        result(err, null);
        return;
      }
      console.log("SuccessFully Added the data");
      result(null, { id: res.insertId, ...newuser });
    }
  );
};

User.login = async (data, result) => {
  console.log(data);
  let username = data.username;

  insertquery = `select username,password,id from Users where username='${data.username}'`;
  sql.query(insertquery, async (err, res) => {
    if (err) {
      console.log(err);
      // res.send(err);
      result(null, err);
    }
    if (res == 0) {
      // res.send("Username is Wrong");
      result(null, { message: "Username is Wrong" });
      console.log("Username is Wrong");
    } else {
      const token = generateToken(); // token is generated
      var password = data.password.toString(); // input password
      let value = res.pop(); // result out of the array
      var loginid = value.id; // get the value
      var password2 = value.password; // get the hash password from query

      const data1 = await bcrypt.compare(password, password2);
      if (data1) {
        sql.query(
          `Insert into UserSession (loginid,token,status) values ('${loginid}','${token}','active')`,
          (err, res) => {
            if (err) {
              res.send(err);
              console.log(err);
            }
            // console.log(token);
            // res.json({username:username,id:loginid,token:token })
            result(null, { username: username, id: loginid, token: token });
          }
        );
      } else {
        // res.send("Login Failed");
        result(null, { message: "Password is wrong" });
      }
    }
  });
};

//Token generate
function generateToken() {
  const N = 30;
  return Array(N + 1)
    .join((Math.random().toString(36) + "00000000000000000").slice(2, 18))
    .slice(0, N);
}

// logout

User.logout = (token, result) => {
  console.log(token);

  sql.query(
    `UPDATE UserSession SET status = 'inactive' WHERE token = '${token}'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        // result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, { message: "Logged out successfully" });
    }
  );
};

User.dashboard = (result) => {
  sql.query(
    "select count(id) from Vendor;select count(id) from Customer;select count(id) from Purchase;select count(id) from Sales;select sum(quantity) from Purchase_Order;select sum(grandTotal) from Purchase;select sum(quantity) from Sales_order;select sum(grandTotal) from Sales",
    (err, res1) => {
      if (err) {
        console.log(err);
        result(null, err);
      } else {
        supplier = res1[0].pop();
        customer = res1[1].pop();
        purchase = res1[2].pop();
        sales = res1[3].pop();
        TotalPurchaseQuantity = res1[4].pop();
        TotalPurchaseprice = res1[5].pop();
        TotalSalesQuantity = res1[6].pop();
        TotalSalesPrice = res1[7].pop();
        // sql.query("select id, (select companyName from manufacturer where manufacturer.id=Purchase.companyName) as companyName,purchaseOrderNumber,address,paymentMode,paymentStatus,(select productName from product where product.id=Purchase.products) as products,totalTax,totalDiscount,grandTotal,subTotal,complete from Purchase where complete='true'",(err,res2)=>{
        insertquery =
          "select a.id,a.productName,a.uniqueid,a.sku,a.balStock,b.categoryName,c.brandName from product as a inner join category as b on a.category=b.id  inner join brand as c on a.brand=c.id order by a.id desc";
        sql.query(insertquery, (err, res2) => {
          if (err) {
            console.log(err);
            result(null, err);
          } else {
            var recentProducts = res2;
            updatequery =
              "select a.id,a.productName,a.uniqueid,a.sku,a.balStock,a.balStock,b.categoryName,c.brandName from product as a inner join category as b on a.category=b.id  inner join brand as c on a.brand=c.id order by a.balStock desc limit 5";
            sql.query(updatequery, (err, res3) => {
              if (err) {
                console.log(err);
                result(null, err);
              } else {
                var TopSellingProducts = res3;
                console.log(TopSellingProducts);
              }
              result(null, {
                customer,
                supplier,
                purchase,
                sales,
                TotalPurchaseQuantity,
                TotalPurchaseprice,
                TotalSalesQuantity,
                TotalSalesPrice,
                recentProducts,
                TopSellingProducts,
              });
            });
          }
        });
      }
    }
  );
};

module.exports = User;

// User.login = async(data, res) => {
//   try {
//     var username = data.username;
//     var password=data.password;

//     let  userdetail =(await query(`select username,password,id from Users where username='${data.username}'`)).pop();

//     console.log(userdetail);

//     const token = generateToken();

//     const data1 = await bcrypt.compare(password, userdetail.password);

//     let insertquery=await query(`insert into UserSession (loginid,token,status) values('${userdetail.id}','${token}','active')`)

//     res.send({Users:userdetail,token});

//   } catch (error) {
//     res.send("error");
//     console.log("error");
//   }
