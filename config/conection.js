const Sequelize = require('sequelize');
const path = 'mysql://root:@localhost:3306/restaurant_bd'
const sequelize = new Sequelize(path,{operatorsAliases: 0 });
sequelize.authenticate().then(()=>{
    console.log('BD Conectado...');})
.catch(err=>{console.log('Error de conexion:',err);});

module.exports = sequelize;