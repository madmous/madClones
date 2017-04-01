'use strict';

const express = require ('express');
const router  = express.Router();

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

router.post('/', (req, res) => {
  saveUserBoard(req, res);
});

router.get('/:idBoard', (req, res) => {
  getUserBoardCards(req, res);
});

router.put('/:idBoard', (req, res) => {
  updateUserBoardCards(req, res);
});

router.post('/:idBoard/cards', (req, res) => {
  saveUserBoardCard(req, res);
});

router.post('/:idBoard/cards/:idCard', (req, res) => {
  saveUserBoardCardItem(req, res);
});

router.delete('/:idBoard', (req, res) => {
  removeUserBoard(req, res);
});

router.post('/:idBoard/boardstars', (req, res) => {
  saveUserBoardStar(req, res);
});

router.delete('/:idBoard/boardstars', (req, res) => {
  removeUserBoardStar(req, res);
});

export default router;