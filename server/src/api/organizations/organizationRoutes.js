'use strict';

const express = require ('express');
const router  = express.Router();

const organizationController = require ('./organizationController');

router.get('/', (req, res) => {
  organizationController.findAll(req, res);
});

router.get('/:id', (req, res) => {
  organizationController.findById(req, res);
});

router.post('/', (req, res) => {
  organizationController.save(req, res);
});

router.put('/:id', (req, res) => {
  organizationController.update(req, res);
});

router.delete('/:id', (req, res) => {
  organizationController.remove(req, res);
});

module.exports = router;