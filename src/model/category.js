const sql = require('./connection')


var Category = function (category) {
    this.id = category.id;
    this.categoryName = category.categoryName;
    this.categoryCode = category.categoryCode;
    this.description = category.description
};


Category.get = (result) => {
    let query = `SELECT * FROM category `;
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        else {
            console.log(res);
            // res.send(result)
            result(null,res);
        }
    });

};

// add the category

Category.create = (data, result) => {
    sql.query("INSERT INTO category SET ?", data, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("create the new user: ", { id: res.insertId, ...data });
        result(null, { id: res.insertId, ...data });
    });
}


Category.update = (id, data, result) => {
    sql.query(
        `UPDATE category SET categoryName = '${data.categoryName}', categoryCode = '${data.categoryCode}',description='${data.description}' WHERE id = ?`,
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

Category.remove = (id, result) => {
    sql.query("DELETE FROM category WHERE id = ?", id, (err, res) => {
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


Category.getbyId = (id, res) => {

    sql.query(`select * from category where id='${id}'`, (err, data) => {
        if (err) {
            console.log(err);
            res.send(err)
        }
        console.log(data);
        res.send(data)
    });
}

module.exports = Category;