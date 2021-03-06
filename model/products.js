const sequelize = require('../config/conection.js');



const insertNewProduct = (dataProduct) => {
    return sequelize.query("INSERT INTO products (prod_name, product_desc, price, product_status) VALUES(?,?,?,?)", { 
        type: sequelize.QueryTypes.INSERT,
        replacements:dataProduct
    })
};


const getFieldUserAdmin = (email) => {
    return sequelize.query('SELECT user_admin FROM users where email = ?', {
        type: sequelize.QueryTypes.SELECT,
        replacements: [email]
    });
};


const getProducts = () => {
    return sequelize.query('SELECT * FROM products where product_status = 1', {
        type: sequelize.QueryTypes.SELECT,
        //replacements: [email]
    });
};


 const getOneProduct = (id) => {
     return sequelize.query('SELECT * FROM products where product_id = ?', {
             type: sequelize.QueryTypes.SELECT,
             replacements: [id]
     });
 };



 const deleteProduct = ( id ) => {
     return sequelize.query('DELETE FROM products where product_id = ?', {
             type: sequelize.QueryTypes.DELETE,
             replacements: [id]
     });
 };


 const updateProduct =  (product_id, product_data) => {
    return sequelize.query(`UPDATE products SET ${product_data} where product_id = ?`, {
        type: sequelize.QueryTypes.put,
        replacements: [product_id]
    })
}


const getExistProduct = (id) => {
    return sequelize.query('SELECT * FROM products where product_id = ? and product_status = 1', {
            type: sequelize.QueryTypes.SELECT,
            replacements: [id]
    });
};



module.exports = {
    insertNewProduct,
    getFieldUserAdmin,
    getProducts,
    getOneProduct,
    deleteProduct,
    updateProduct,
    getExistProduct
};