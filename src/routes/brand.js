module.exports = app => {
    const Brand = require("../controller/brand")

    app.get('/api/brands', Brand.getall);      // alldetails get

    app.get('/api/brand/', Brand.getbyId);         // brand get by id

    app.post('/api/brand', Brand.newone)             // new brand

    app.patch('/api/brand/', Brand.update);          // update brand

    app.delete('/api/brand/', Brand.delete);          // delete brand
}
