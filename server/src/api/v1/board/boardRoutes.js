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

import {
  removeUserBoardStarSchema,
  saveUserBoardStarSchema,
  removeUserBoardSchema,
  saveUserBoardSchema
} from './boardValidation';

import {
  saveUserBoardCardItemSchema,
  updateUserBoardCardsSchema,
  saveUserBoardCardSchema,
  getUserBoardCardsSchema
} from '../card/cardValidation';

const router  = express.Router();

router.route('/')
    .post(validate(saveUserBoardSchema), saveUserBoard);

router.route('/:idBoard')
    .get(validate(getUserBoardCardsSchema), getUserBoardCards)
    .put(validate(updateUserBoardCardsSchema), updateUserBoardCards)
    .delete(validate(removeUserBoardSchema), removeUserBoard);

router.route('/:idBoard/cards')
    .post(validate(saveUserBoardCardSchema), saveUserBoardCard);

router.route('/:idBoard/cards/:idCard')
    .post(validate(saveUserBoardCardItemSchema), saveUserBoardCardItem);

router.route('/:idBoard/boardstars')
    .post(validate(saveUserBoardStarSchema), saveUserBoardStar)
    .delete(validate(removeUserBoardStarSchema), removeUserBoardStar);

export default router;