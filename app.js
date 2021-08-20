require('dotenv').config();
const PORT = process.env.PORT; 
const express = require ('express');
const routes = require('./source/routes/routes.js');
const gMiddle = require('./source/middlewares/globalMiddle.js');
const app = express();
//const port = 3000;
//app.use(express.json());

gMiddle(app);
routes(app);


//PORT LISTEN
app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`);
});
