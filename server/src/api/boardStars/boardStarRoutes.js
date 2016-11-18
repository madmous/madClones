'use strict';

const express = require ('express');
const router  = express.Router();

const boardStarController = require ('./boardStarController');

router.get('/', (req, res) => {
  boardStarController.findAll(req, res);
});

router.get('/:id', (req, res) => {
  boardStarController.findById(req, res);
});

router.post('/', (req, res) => {
  boardStarController.save(req, res);
});

router.put('/:id', (req, res) => {
  boardStarController.update(req, res);
});

router.delete('/:id', (req, res) => {
  boardStarController.remove(req, res);
});

module.exports = router;