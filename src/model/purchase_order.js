const sql = require('./connection')


var Purchase_order = function (purchaseorder) {
    this.id = purchaseorder.id;
    this.po = purchaseorder.po;
    this.purchaseOrderNumber = purchaseorder.email;
    this.productId = purchaseorder.productId;
    this.quantity = purchaseorder.quantity;
    this.mrp = purchaseorder.mrp;
    this.unit = purchaseorder.unit;
    this.price = purchaseorder.price;
    this.discount = purchaseorder.discount;
    this.tax = purchaseorder.tax;
    this.total = purchaseorder.total;
};


Purchase_order.get = (result) => {
    let query = `SELECT * FROM Purchase_order `;
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        else {

            console.log("Customer: ", res);
            result(null, res);
        }
    });

};


// add the Purchase_order

Purchase_order.create = (data, po, result) => {
    data.complete = false;
    console.log(po);
    var insertquery = `select purchaseOrderNumber from Purchase where id='${po}'`;
    sql.query(insertquery, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        } else {
            var purchaseOrderNumber = res.pop().purchaseOrderNumber;
            console.log(purchaseOrderNumber);

            sql.query(`update product set stock='${data.quantity}',balStock='${data.quantity}' where id='${data.productId}'`, (err, res3) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(res3);


                    sql.query(`INSERT INTO Purchase_Order (po,purchaseOrderNumber,productId,quantity,mrp,unit,price,discount,tax,total,complete) values('${po}','${purchaseOrderNumber}','${data.productId}','${data.quantity}','${data.mrp}','${data.unit}','${data.price}','${data.discount}','${data.tax}','${data.total}','false')`, (err, res) => {
                        if (err) {
                            console.log("error: ", err);
                            result(err, null);
                            return;
                        }

                        console.log("create the new Order: ", { id: res.insertId, ...data });
                        result(null, { id: res.insertId, ...data });
                    });
                }
            })
        }
    })
}




module.exports = Purchase_order;