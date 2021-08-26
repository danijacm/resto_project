const sequelize = require('../config/conection.js');

const insertNewOrder = (orderData) => {
    return sequelize.query("INSERT INTO orders (email, payment_code, order_address, status_id) VALUES(?,?,?,?)", { 
        type: sequelize.QueryTypes.INSERT,
        replacements:orderData,
    })
};


module.exports = {
    insertNewOrder
};