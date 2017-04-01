'use strict';

const validate = require ('express-validation');
const express = require ('express');
const router  = express.Router();

const signupValidation = require ('./signupValidation');
const signUpController = require ('./signUpController');

router.route('/')
  .post(validate(signupValidation.saveUser), signUpController.saveUser)

module.exports = router;