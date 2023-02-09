const express = require('express');
const cors = require('cors');
const middleware=require('./middleware');
const app = express();

app.use(cors({ origin: "*", }));
app.use(express.json());
app.use(middleware);

require('./src/routes/user')(app);           // user module
require('./src/routes/product')(app);        // product module
require('./src/routes/manufacturer')(app);   // manufactor module
require('./src/routes/brand')(app);          // brand module
require('./src/routes/category')(app);       // category module
require('./src/routes/vendor')(app);         // Vendor module
require('./src/routes/purchase')(app);       // Purchase Module
require('./src/routes/purchase_order')(app);       // Purchase Module
require('./src/routes/customer')(app);       // customer Module
require('./src/routes/sales')(app);       // sales Module
require('./src/routes/sale')(app);       // sales Module


app.listen(8008, () => {
    console.log(`server Started At http://localhost:${8008}`);
});