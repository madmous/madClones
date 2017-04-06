'use strict';

import validate from 'express-validation';
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

import {
  removeOrganizationBoardStarSchema,
  saveOrganizationBoardStarSchema,
  removeOrganizationBoardSchema,
  updateOrganizationBoardSchema,
  saveOrganizationBoardSchema,
  removeOrganizationSchema,
  updateOrganizationSchema,
  saveOrganizationSchema
} from './organizationValidation';

const router  = express.Router();

router.route('/').post(validate(saveOrganizationSchema), saveOrganization);

router.route('/:idOrganization')
    .put(validate(updateOrganizationSchema), updateOrganization)
    .delete(validate(removeOrganizationSchema), removeOrganization);

router.route('/:idOrganization/boards').post(validate(saveOrganizationBoardSchema), saveOrganizationBoard);

router.route('/:idOrganization/boards/:idBoard')
    .put(validate(updateOrganizationBoardSchema), updateOrganizationBoard)
    .delete(validate(removeOrganizationBoardSchema), removeOrganizationBoard);

router.route('/:idOrganization/boards/:idBoard/boardstars')
    .post(validate(saveOrganizationBoardStarSchema), saveOrganizationBoardStar)
    .delete(validate(removeOrganizationBoardStarSchema), removeOrganizationBoardStar);

export default router;