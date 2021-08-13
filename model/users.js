const sequelize = require('../config/conection.js');


const insertNewUser = (newUserData) => {
    return sequelize.query("INSERT INTO users (email, fullname, phone, user_address, user_password, user_admin) VALUES(?,?,?,?,MD5(?),?)", { 
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


module.exports = {
    insertNewUser,
    getEmail
};