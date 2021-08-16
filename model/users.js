const sequelize = require('../config/conection.js');


/*const insertNewUser = (newUserData) => {
    return sequelize.query("INSERT INTO users (email, fullname, phone, user_address, user_password, user_admin) VALUES(?,?,?,?,MD5(?),?)", { 
        type: sequelize.QueryTypes.INSERT,
        replacements:newUserData,
    })
};*/


const insertNewUser = (newUserData) => {
    return sequelize.query("INSERT INTO users (email, fullname, phone, user_address, user_password, user_admin) VALUES(?,?,?,?,?,?)", { 
        type: sequelize.QueryTypes.INSERT,
        replacements:newUserData,
    })
};


const getEmail = ( email ) => {
    return sequelize.query('SELECT email FROM users where email = ?', {
            type: sequelize.QueryTypes.SELECT,
            replacements: [email]
    })
}


const getDataLogin = (dataLogin) => {
    return sequelize.query('SELECT email, user_password FROM users where email = ? and user_password = ?', {
        type: sequelize.QueryTypes.SELECT,
        replacements: dataLogin
    })
}


/*const getDataLogin = (dataLogin) => {
    return sequelize.query('SELECT email, user_password FROM users where email = ?', {
        type: sequelize.QueryTypes.SELECT,
        replacements: [dataLogin]
    })
}*/


module.exports = {
    insertNewUser,
    getEmail,
    getDataLogin
};