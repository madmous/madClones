'use strict';

const express = require ('express');
const router  = express.Router();

const userController = require ('./userController');

router.get('/', (req, res) => {
  userController.getUser(req, res);
});

router.put('/', (req, res) => {
  userController.updateUser(req, res);
});

router.delete('/', (req, res) => {
  userController.removeUser(req, res);
});

module.exports = router;