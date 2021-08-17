const user = require('../../modules/index_users.js');
const products = require('../../modules/index_products.js');


module.exports = function (app) {
    app.use("/user", user)
    app.use('/products',products)
    //app.use('/order',orders)
}

