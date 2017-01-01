'use strict';

const express = require ('express');
const router  = express.Router();

const loginController = require ('./loginController');

router.post('/', (req, res) => {
  loginController.authenticate(req, res);
});

module.exports = router;