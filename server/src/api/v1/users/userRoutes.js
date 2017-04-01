'use strict';

const validate = require ('express-validation');
const express  = require ('express');
const router   = express.Router();

import {
  updateUser,
  removeUser,
  getUser
} from './userController';

const userValidation = require ('./userValidation');
const userController = require ('./userController');

router.route('/')
  .get(getUser)
  .put(validate(userValidation.updateUser), updateUser)
  .delete(removeUser)

module.exports = router;