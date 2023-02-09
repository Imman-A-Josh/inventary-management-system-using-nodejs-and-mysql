const sql = require('./connection')
const calculation = require('./calculation')



var Sales = function (sales) {
    this.id = sales.id;
    this.customerName = sales.customerName;
    this.saleDate = sales.saleDate;
    this.address = sales.address;
    this.supplier = sales.supplier;
    this.paymentStatus = sales.paymentStatus;
    this.paymentMode = sales.paymentMode;
    this.unit = sales.unit;
    this.date=sales.date;
    this.totaltax = sales.totaltax;
    this.subTotal = sales.subTotal
    this.totalDiscount = sales.totalDiscount;
    this.grandTotal = sales.grandTotal;
    this.postedBy = sales.postedBy;
};


Sales.get = (result) => {
    // let query = `SELECT * FROM Sales `;
    let query = "SELECT id,(SELECT name FROM Customer WHERE Customer.id = Sales.customerName) AS customerName,saleDate,address,(select vendorName from Vendor where Vendor.id=Sales.supplier) as supplier,paymentMode,paymentStatus FROM Sales"
    sql.query(query, (err, res) => {
        if (err) {
            console.log(err);
            result(null,err)
        }
        else {
            console.log(res);
            result(null,res)
        }
    });

};


// add the Product

Sales.create = (data,result) => {
    sql.query(`select id from Customer where name='${data.customerName}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        else {

            var customerName = res.pop().id;
            console.log(customerName);

            sql.query(`select id from Vendor where vendorName='${data.supplier}'`, (err, res1) => {
                if (err) {
                    result(err, null);
                    return;
                }
                else {
                    var supplier=res1.pop().id

                    let insertquery = `insert into Sales (customerName,saleDate,address,supplier,paymentStatus,paymentMode,date) values('${customerName}','${data.saleDate}','${data.address}','${supplier}','${data.paymentStatus}','${data.paymentMode}','${data.date}')`;
                    sql.query(insertquery, (err, res) => {   // 
                        if (err) {
                            console.log("error: ", err);
                            result(err, null);
                            return;
                        }
                        console.log("create the new Sale: ", { id: res.insertId, ...data });
                        result(null, { id: res.insertId });

                    })
                }
            });
        }
    })
}
Sales.SubmitButton = (Order, postedBy, result) => {

    sql.query(`select * from Sales_order where so='${Order}';select product,unit from Sales_order where so='${Order}'`, async (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        } else {
            let data1=res[1].pop()
            let products = data1.product
            console.log(products);
            let unit =data1.unit;
            console.log(unit);
            let data = res[0];

            var totalDiscount = await calculation.calculateTotalDiscount(data);
            console.log(totalDiscount);
            var totaltax = await calculation.calculateTotalTax(data);
            console.log(totaltax);
            var subTotal = await calculation.calculateSubTotal(data);
            console.log(subTotal);
            var grandTotal = await calculation.grandTotal(totalDiscount, totaltax, subTotal);
            console.log(grandTotal);
            sql.query(`Update Sales set product='${products}',unit='${unit}',totalTax='${totaltax}',subTotal='${subTotal}',totalDiscount='${totalDiscount}',grandTotal='${grandTotal}',postedBy='${postedBy}',complete='True'`, (err, res) => {
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

Sales.update = (id, data, result) => {
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

Sales.remove = (id, result) => {
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


Sales.getbyId = (id, res) => {

    sql.query(`select * from product where id='${id}'`, (err, data) => {
        if (err) {
            console.log(err);
            res.send(err)
        }
        console.log(data);
        res.send(data)
    });
}

module.exports = Sales;