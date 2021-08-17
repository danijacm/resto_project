const sequelize = require('../config/conection.js');



const insertNewProduct = (dataProduct) => {
    return sequelize.query("INSERT INTO products (prod_name, product_desc, price, product_status) VALUES(?,?,?,?)", { 
        type: sequelize.QueryTypes.INSERT,
        replacements:dataProduct
    })
};


const getFieldUserAdmin = (email) => {
    return sequelize.query('SELECT user_admin FROM users WHERE email = ?', {
        type: sequelize.QueryTypes.SELECT,
        replacements: [email]
    });
};

module.exports = {
    insertNewProduct,
    getFieldUserAdmin
};