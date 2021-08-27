const sequelize = require('../config/conection.js');

const insertNewOrder = (orderData) => {
    return sequelize.query("INSERT INTO orders (email, payment_code, order_address, status_id) VALUES(?,?,?,?)", { 
        type: sequelize.QueryTypes.INSERT,
        replacements:orderData,
    })
};

const insertProductQuantity = (productQuantity) => {
    return sequelize.query("INSERT INTO order_products (order_id, product_id, quantity) VALUES(?,?,?)", { 
        type: sequelize.QueryTypes.INSERT,
        replacements:productQuantity,
    })
};


const getTotalOrderValue = (id) => {
    return sequelize.query(`SELECT p.product_id, o.quantity, p.price FROM order_products o INNER JOIN products p ON (o.product_id = p.product_id) where o.order_id = ?`, { 
        type: sequelize.QueryTypes.SELECT,
        replacements:[id],
    })
};

module.exports = {
    insertNewOrder,
    insertProductQuantity,
    getTotalOrderValue
};