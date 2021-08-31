const sequelize = require('../config/conection.js');

const insertNewOrder = (orderData) => {
    return sequelize.query("INSERT INTO orders (user_id, email, payment_code, order_address, status_id) VALUES(?,?,?,?,?)", { 
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
    return sequelize.query(`SELECT p.product_id, o.quantity, p.price FROM order_products o INNER JOIN products p ON (o.product_id = p.product_id) where o.order_id = ?`, 
    { 
        type: sequelize.QueryTypes.SELECT,
        replacements:[id],
    })
};


const updateOrder = (dataOrder) => {
    return sequelize.query(`UPDATE orders SET payment_code = ?, status_id = ? WHERE order_id = ?`, 
    { 
        type: sequelize.QueryTypes.UPDATE,
        replacements:dataOrder,
    })
};


const getOrder = ( order_id ) => {
    return sequelize.query('SELECT order_id FROM orders WHERE order_id = ?', {
            type: sequelize.QueryTypes.SELECT,
            replacements: [order_id]
    })
}

const getOrderUserId = ( user_id ) => {
    return sequelize.query('SELECT user_id FROM orders WHERE user_id = ? and status_id = 6', {
            type: sequelize.QueryTypes.SELECT,
            replacements: [user_id]
    })
}


const updateOrderStatus = (dataOrder) => {
    return sequelize.query(`UPDATE orders SET status_id = ? WHERE order_id = ?`, 
    { 
        type: sequelize.QueryTypes.UPDATE,
        replacements:dataOrder,
    })
};


const getOrderStatus = (status_id) => {
    return sequelize.query('SELECT * FROM order_status WHERE status_id = ?', {
            type: sequelize.QueryTypes.SELECT,
            replacements: [status_id]
    })
}


module.exports = {
    insertNewOrder,
    insertProductQuantity,
    getTotalOrderValue,
    updateOrder,
    getOrder, 
    getOrderUserId,
    updateOrderStatus,
    getOrderStatus
};