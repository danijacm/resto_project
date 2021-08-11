const sequelize = require('../config/conection.js');


const insertNewUser = (newUserData) => {
    return sequelize.query("INSERT INTO users (email, fullname, phone, user_address, user_password, user_admin) VALUES(?,?,?,?,MD5(?),?)", { 
        type: sequelize.QueryTypes.INSERT,
        replacements:newUserData,
    })
};


module.exports = {insertNewUser};