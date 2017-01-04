'use strict';

const express = require ('express');
const router  = express.Router();

const organizationController = require ('./organizationController');

router.post('/', (req, res) => {
  organizationController.saveOrganization(req, res);
});

router.put('/:idOrganization', (req, res) => {
  organizationController.updateOrganization(req, res);
});

router.delete('/:idOrganization', (req, res) => {
  organizationController.removeOrganization(req, res);
});

router.post('/:idOrganization/boards', (req, res) => {
  organizationController.saveOrganizationBoard(req, res);
});

router.put('/:idOrganization/boards/:idBoard', (req, res) => {
  organizationController.updateOrganizationBoard(req, res);
});

router.delete('/:idOrganization/boards/:idBoard', (req, res) => {
  organizationController.removeOrganizationBoard(req, res);
});

router.post('/:idOrganization/boards/:idBoard/boardstars', (req, res) => {
  organizationController.saveOrganizationBoardStar(req, res);
});

router.delete('/:idOrganization/boards/:idBoard/boardstars', (req, res) => {
  organizationController.removeOrganizationBoardStar(req, res);
});


module.exports = router;