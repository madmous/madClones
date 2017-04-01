'use strict';

const express = require ('express');
const router  = express.Router();

import {
  removeOrganizationBoardStar,
  saveOrganizationBoardStar,
  removeOrganizationBoard,
  updateOrganizationBoard,
  saveOrganizationBoard,
  removeOrganization,
  updateOrganization,
  saveOrganization,
} from './organizationController';

router.post('/', (req, res) => {
  saveOrganization(req, res);
});

router.put('/:idOrganization', (req, res) => {
  updateOrganization(req, res);
});

router.delete('/:idOrganization', (req, res) => {
  removeOrganization(req, res);
});

router.post('/:idOrganization/boards', (req, res) => {
  saveOrganizationBoard(req, res);
});

router.put('/:idOrganization/boards/:idBoard', (req, res) => {
  updateOrganizationBoard(req, res);
});

router.delete('/:idOrganization/boards/:idBoard', (req, res) => {
  removeOrganizationBoard(req, res);
});

router.post('/:idOrganization/boards/:idBoard/boardstars', (req, res) => {
  saveOrganizationBoardStar(req, res);
});

router.delete('/:idOrganization/boards/:idBoard/boardstars', (req, res) => {
  removeOrganizationBoardStar(req, res);
});

export default router;