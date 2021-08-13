const user = require('../../modules/index_users.js');


module.exports = function (app) {
    app.use("/user", user)
    ///app.use('/plates',products)
    //app.use('/order',orders)
}

