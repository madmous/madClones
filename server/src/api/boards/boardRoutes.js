'use strict';

const express = require ('express');
const router  = express.Router();

const boardController = require ('./boardController');

router.get('/', (req, res) => {
  boardController.findAll(req, res);
});

router.get('/:id', (req, res) => {
  boardController.findById(req, res);
});

router.post('/', (req, res) => {
  boardController.save(req, res);
});

router.put('/:id', (req, res) => {
  boardController.update(req, res);
});

router.delete('/:id', (req, res) => {
  boardController.remove(req, res);
});

module.exports = router;