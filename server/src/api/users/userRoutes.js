'use strict';

const express = require ('express');
const router  = express.Router();

const userController = require ('./usersController');

router.get('/', (req, res) => {
  userController.findAll(req, res);
});

router.get('/:id', (req, res) => {
  userController.findById(req, res);
});

router.post('/', (req, res) => {
  userController.save(req, res);
});

router.put('/:id', (req, res) => {
  userController.update(req, res);
});

router.delete('/:id', (req, res) => {
  userController.remove(req, res);
});

module.exports = router;