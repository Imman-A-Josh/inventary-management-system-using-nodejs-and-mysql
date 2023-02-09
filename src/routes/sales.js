
module.exports = app => {
    const Sales = require("../controller/sales")

    app.get('/api/sales', Sales.getall);    // get all the fields

    app.get('/api/sales/', Sales.getbyId);   // get sales by id

    app.post('/api/sale', Sales.create);    // add the sales

    app.get('/api/sales/pur/', Sales.afterClickingTheSubmitButton); 

    app.patch('/api/sale/', Sales.update);  // update by id

    app.delete('/api/sale/', Sales.delete);  // delete sales by id
}
