'use strict';

import express from 'express';

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

const router  = express.Router();

router.route('/').post(saveOrganization);

router.route('/:idOrganization')
    .put(updateOrganization)
    .delete(removeOrganization);

router.route('/:idOrganization/boards').post(saveOrganizationBoard);

router.route('/:idOrganization/boards/:idBoard')
    .put(updateOrganizationBoard)
    .delete(removeOrganizationBoard);

router.route('/:idOrganization/boards/:idBoard/boardstars')
    .post(saveOrganizationBoardStar)
    .delete(removeOrganizationBoardStar);

export default router;