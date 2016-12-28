'use strict';

const express = require ('express');
const router  = express.Router();

const userController = require ('./userController');

router.get('/', (req, res) => {
  userController.findAll(req, res);
});

router.get('/:id', (req, res) => {
  userController.findById(req, res);
});

router.get('/:id/organizations', (req, res) => {
  userController.findOrganizations(req, res);
});

router.get('/:id/organizations/:idOrganization/boards', (req, res) => {
  userController.findBoardsByOrganization(req, res);
});

router.post('/', (req, res) => {
  userController.save(req, res);
});

router.post('/:id/boards', (req, res) => {
  userController.saveUserBoard(req, res);
});

router.post('/:id/organizations', (req, res) => {
  userController.saveOrganization(req, res);
});

router.post('/:id/organizations/:idOrganization/boards', (req, res) => {
  userController.saveBoard(req, res);
});

router.post('/:id/boards/:idBoard/boardstars', (req, res) => {
  userController.saveUserBoardStar(req, res);
});

router.post('/:id/organizations/:idOrganization/boards/:idBoard/boardstars', (req, res) => {
  userController.saveBoardStar(req, res);
});

router.put('/:id', (req, res) => {
  userController.update(req, res);
});

router.put('/:id/organizations/:idOrganization', (req, res) => {
  userController.updateOrganization(req, res);
});

router.put('/:id/organizations/:idOrganization/boards/:idBoard', (req, res) => {
  userController.updateBoard(req, res);
});

router.delete('/:id', (req, res) => {
  userController.remove(req, res);
});

router.delete('/:id/organizations/:idOrganization', (req, res) => {
  userController.removeOrganization(req, res);
});

router.delete('/:id/organizations/:idOrganization/boards/:idBoard', (req, res) => {
  userController.removeBoard(req, res);
});

router.delete('/:id/boardstars/:idBoardStar', (req, res) => {
  userController.removeBoardStar(req, res);
});

module.exports = router;