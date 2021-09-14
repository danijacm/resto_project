 const express = require('express');
 const router = express.Router();

 const {createNewUser} = require('../source/controllers/user/user_create.js');
 const {loginUser} = require('../source/controllers/user/user_create.js');

 const {validateRequestUser} = require('../source/middlewares/users/usersMiddle.js');
 const {validatePk} = require('../source/middlewares/users/usersMiddle.js');
 const {validateRequestLogin} = require('../source/middlewares/users/usersMiddle.js');

 router.post('/create_user', validateRequestUser, validatePk, createNewUser);
 router.post('/user_login', validateRequestLogin, loginUser);

 module.exports = router;
