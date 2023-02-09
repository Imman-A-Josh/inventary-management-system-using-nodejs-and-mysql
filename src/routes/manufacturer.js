
//exports the module (app)

module.exports = app => {
    const Manufacturer = require("../controller/manufacturer")  // import the file

    app.get('/api/manufacturers', Manufacturer.getall);   // all listes show the api

    app.get('/manu/:id', Manufacturer.getbyId);    // get by id 

    app.post('/api/manufacturer', Manufacturer.create);   // post the manufacturer

    app.patch('/api/manufacturer/', Manufacturer.update);  // update all fields (edit)

    app.delete('/api/manufacturer/', Manufacturer.delete);  // delete all fileds
}


// completed