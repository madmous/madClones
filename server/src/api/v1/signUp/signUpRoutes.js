'use strict';

const express = require ('express');
const router  = express.Router();

const signUpController = require ('./signUpController');

router.post('/', (req, res) => {
  signUpController.saveUser(req, res);
});

module.exports = router;