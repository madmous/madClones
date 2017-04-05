'use strict';

import validate from 'express-validation';
import express from 'express';

import {
  removeUserBoardStar,
  saveUserBoardStar,
  removeUserBoard,
  saveUserBoard
} from './boardController';

import {
  saveUserBoardCardItem,
  updateUserBoardCards,
  getUserBoardCards,
  saveUserBoardCard
} from '../card/cardController';

import * as boardValidators from './boardValidation';

const {
  removeUserBoardStarSchema,
  saveUserBoardStarSchema,
  removeUserBoardSchema,
  saveUserBoardSchema
} = boardValidators

const router  = express.Router();

router.route('/').post(validate(saveUserBoardSchema), saveUserBoard);

router.route('/:idBoard')
    .get(getUserBoardCards)
    .put(updateUserBoardCards)
    .delete(validate(removeUserBoardSchema), removeUserBoard);

router.route('/:idBoard/cards').post(saveUserBoardCard);

router.route('/:idBoard/cards/:idCard').post(saveUserBoardCardItem);

router.route('/:idBoard/boardstars')
    .post(validate(saveUserBoardStarSchema), saveUserBoardStar)
    .delete(validate(removeUserBoardStarSchema), removeUserBoardStar);

export default router;