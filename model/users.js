const sequelize = require('../config/conection.js');

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
    return sequelize.query('SELECT * FROM users where email = ? and user_password = ?', {
        type: sequelize.QueryTypes.SELECT,
        replacements: dataLogin
    })
}

const getUserId = ( user_id ) => {
    return sequelize.query('SELECT user_id FROM users where user_id = ?', {
            type: sequelize.QueryTypes.SELECT,
            replacements: [user_id]
    })
}

const getUserProfile = ( user_id ) => {
    return sequelize.query('SELECT user_admin FROM users where user_id = ?', {
            type: sequelize.QueryTypes.SELECT,
            replacements: [user_id]
    })
}


module.exports = {
    insertNewUser,
    getEmail,
    getDataLogin,
    getUserId,
    getUserProfile
};