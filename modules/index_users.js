 const express = require('express');
 const router = express.Router();

 const {createNewUser} = require('../source/controllers/user/user_create.js');
 const {validateRequestUser} = require('../source/middlewares/users/usersMiddle.js');

 router.post('/create_user', validateRequestUser, createNewUser);

 module.exports = router;
