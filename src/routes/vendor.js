module.exports = app => {
    const Vendor = require("../controller/vendor")

    app.get('/api/vendors', Vendor.getall);    // get all the fields

    app.get('/api/vendor/', Vendor.getbyId);   // get vendor by id

    app.post('/api/vendor', Vendor.create);    // add the vendor

    app.patch('/api/vendor/', Vendor.update);  // update by id

    app.delete('/api/vendor/', Vendor.delete);  // delete vendor by id
}
