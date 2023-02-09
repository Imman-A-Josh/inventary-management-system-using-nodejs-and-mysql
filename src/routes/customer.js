
module.exports = app => {
    const Customer = require("../controller/customer")

    app.get('/api/customers', Customer.getall);   //? getall the customer

    app.post('/api/customer',Customer.newone)     //? create the customer

    app.get('/api/customer/', Customer.getbyId);      //? customer get

    app.patch('/api/customer/',Customer.update);        //? update customer

    app.delete('/api/customer/',Customer.delete);        //? delete a customer

}
