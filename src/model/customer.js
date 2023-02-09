const sql = require('./connection')


var Customer = function (customer) {
    this.id = customer.id;
    this.name = customer.name;
    this.email = customer.email;
    this.phone = customer.phone;
    this.type = customer.type;
    this.GSTno = customer.GSTno;
    this.postedBy = customer.postedBy;
};


Customer.get = (result) => {
    let query = `SELECT * FROM Customer `;
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


// add the category

Customer.create = (data, result) => {
    sql.query("INSERT INTO Customer SET ?", data, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("create the new Customer: ", { id: res.insertId, ...data });
        result(null, { id: res.insertId, ...data });
    });
}


Customer.update = (id, data, result) => {
    sql.query(
        `UPDATE Customer SET name = '${data.name}', email = '${data.email}',phone='${data.phone}', type = '${data.type}',GSTno='${data.GSTno}' WHERE id = ?`,
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

Customer.remove = (id, result) => {
    sql.query("DELETE FROM Customer WHERE id = ?", id, (err, res) => {
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

        console.log("delete Customer with id: ", id);
        result(null, res);
    });
};


Customer.getbyId = (id, res) => {

    sql.query(`select * from Customer where id='${id}'`, (err, data) => {
        if (err) {
            console.log(err);
            res.send(err)
        }
        console.log(data);
        res.send(data)
    });
}

module.exports = Customer;