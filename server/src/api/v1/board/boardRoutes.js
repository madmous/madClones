'use strict';

import validate from 'express-validation';
import express from 'express';

import {
  removeUserBoardStar,
  saveUserBoardStar,
  removeUserBoard,
  renameBoardName,
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
  renameBoardNameSchema,
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
    .delete(validate(removeUserBoardSchema), removeUserBoard)
    .put(validate(renameBoardNameSchema), renameBoardName);

router.route('/:idBoard/cards')
    .get(validate(getUserBoardCardsSchema), getUserBoardCards)
    .post(validate(saveUserBoardCardSchema), saveUserBoardCard)
    .put(validate(updateUserBoardCardsSchema), updateUserBoardCards);

router.route('/:idBoard/cards/:idCard')
    .post(validate(saveUserBoardCardItemSchema), saveUserBoardCardItem);

router.route('/:idBoard/boardstars')
    .post(validate(saveUserBoardStarSchema), saveUserBoardStar)
    .delete(validate(removeUserBoardStarSchema), removeUserBoardStar);

export default router;