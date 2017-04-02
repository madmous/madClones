'use strict';

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

const router  = express.Router();

router.route('/').post(saveUserBoard);

router.route('/:idBoard')
    .get(getUserBoardCards)
    .put(updateUserBoardCards)
    .delete(removeUserBoard);

router.route('/:idBoard/cards').post(saveUserBoardCard);

router.route('/:idBoard/cards/:idCard').post(saveUserBoardCardItem);

router.route('/:idBoard/boardstars')
    .post(saveUserBoardStar)
    .delete(removeUserBoardStar);

export default router;