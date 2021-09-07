const sequelize = require('../config/conection.js');

const insertNewOrder = (orderData) => {
    return sequelize.query("INSERT INTO orders (user_id, email, payment_code, order_address, status_id) VALUES(?,?,?,?,?)", {
        type: sequelize.QueryTypes.INSERT,
        replacements: orderData,
    })
};

const insertProductQuantity = (productQuantity) => {
    return sequelize.query("INSERT INTO order_products (order_id, product_id, quantity) VALUES(?,?,?)", {
        type: sequelize.QueryTypes.INSERT,
        replacements: productQuantity,
    })
};


const getTotalOrderValue = (id) => {
    return sequelize.query(`SELECT p.product_id, p.prod_name, o.quantity, p.price FROM order_products o INNER JOIN products p ON (o.product_id = p.product_id) where o.order_id = ?`, {
        type: sequelize.QueryTypes.SELECT,
        replacements: [id],
    })
};


const updateOrder = (dataOrder) => {
    return sequelize.query(`UPDATE orders SET payment_code = ?, status_id = ? WHERE order_id = ?`, {
        type: sequelize.QueryTypes.UPDATE,
        replacements: dataOrder,
    })
};


const getOrder = (order_id) => {
    return sequelize.query('SELECT order_id FROM orders WHERE order_id = ?', {
        type: sequelize.QueryTypes.SELECT,
        replacements: [order_id]
    })
}

const getOrderUserId = (user_id) => {
    return sequelize.query('SELECT user_id FROM orders WHERE user_id = ? and status_id = 6', {
        type: sequelize.QueryTypes.SELECT,
        replacements: [user_id]
    })
}


const updateOrderStatus = (dataOrder) => {
    return sequelize.query(`UPDATE orders SET status_id = ? WHERE order_id = ?`, {
        type: sequelize.QueryTypes.UPDATE,
        replacements: dataOrder,
    })
};


const getOrderStatus = (status_id) => {
    return sequelize.query('SELECT * FROM order_status WHERE status_id = ?', {
        type: sequelize.QueryTypes.SELECT,
        replacements: [status_id]
    })
}


const getOrdersByUser = (user_id) => {
    const order_cancl = 5;
    const order_delivered = 4;
    return sequelize.query(`select u.fullname, o.order_address, o.order_id, o.status_id, o.payment_code from users u
                            join orders o on (u.user_id = o.user_id) where u.user_id = ? and o.status_id != ${order_cancl} 
                            and o.status_id != ${order_delivered}`, {
            type: sequelize.QueryTypes.SELECT,
            replacements: [user_id]
    })
}


const getOrdStatAndPaymeth = (dataOrder) => {
    return sequelize.query(`select o.status_id, o.payment_code, os.status_desc, pm.payment_desc 
    from orders o
    join order_status os 
    on (o.status_id = os.status_id)
    join payment_methods pm 
    on (o.payment_code = pm.payment_code) where o.status_id = ? and o.payment_code = ?`, {
            type: sequelize.QueryTypes.SELECT,
            replacements: dataOrder
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
    getOrderStatus,
    getOrdersByUser,
    getOrdStatAndPaymeth
};