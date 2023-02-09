
module.exports = app => {
    const Category = require("../controller/category")

    app.get('/api/categories', Category.getall);   //? getall the category

    app.post('/api/category',Category.newone)     //? create the category

    app.get('/api/category/', Category.getbyId);      //? allcategory get

    app.patch('/api/category/',Category.update);        //? update category

    app.delete('/api/category/',Category.delete);        //? delete a category

}
