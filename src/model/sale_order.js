const sql = require('./connection');
const { update } = require('./product');


var Sales_order = function (salesorder) {
    this.id = salesorder.id;
    this.so = salesorder.so;
    this.product = salesorder.product;
    this.quantity = salesorder.quantity;
    this.mrp = salesorder.mrp;
    this.unit = salesorder.unit;
    this.price = salesorder.price;
    this.discount = salesorder.discount;
    this.tax = salesorder.tax;
    this.total = salesorder.total;
};


Sales_order.get = (result) => {
    let query = `SELECT * FROM Sales_order `;
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        else {

            console.log("Sales: ", res);
            result(null, res);
        }
    });

};


// add the Sales_order

Sales_order.create = (data, so, result) => {

    console.log(so);
    var quantity = data.quantity;
    sql.query(`select id from product where productName='${data.product}'`, (err, res2) => {
        if (err) {
            console.log(res2);
            result(null, res2);
        }else{
            var product=res2.pop().id;
            console.log(product);

            sql.query(`select stock from product where id=${product}`, (err, res1) => {
                if (err) {
                    console.log(err);
                }
                data1 = res1.pop()
                var stock = data1.stock

                let outStock = stock - (quantity);

                let balStock=stock - (outStock)
                console.log(balStock);

                sql.query(`update product set outStock='${outStock}',balStock='${balStock}' where id='${product}'`, (err, res) => {
                    if (err) {
                        console.log(err);
                        result(null, err)
                    }
                    else {

                        sql.query(`INSERT INTO Sales_order (so,product,quantity,mrp,unit,price,discount,tax,total,complete) values('${so}','${product}','${quantity}','${data.mrp}','${data.unit}','${data.price}','${data.discount}','${data.tax}','${data.total}','false')`, (err, res) => {
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
            })
        }
    });
}




module.exports = Sales_order;