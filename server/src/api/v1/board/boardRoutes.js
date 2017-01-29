'use strict';

const express = require ('express');
const router  = express.Router();

const boardController = require ('./boardController');
const cardController  = require ('../card/cardController');

router.post('/', (req, res) => {
  boardController.saveUserBoard(req, res);
});

router.get('/:idBoard', (req, res) => {
  cardController.getUserBoardCards(req, res);
});

router.put('/:idBoard', (req, res) => {
  cardController.updateUserBoardCards(req, res);
});

router.post('/:idBoard/cards', (req, res) => {
  cardController.saveUserBoardCard(req, res);
});

router.post('/:idBoard/cards/:idCard', (req, res) => {
  cardController.saveUserBoardCardItem(req, res);
});

router.delete('/:idBoard', (req, res) => {
  boardController.removeUserBoard(req, res);
});

router.post('/:idBoard/boardstars', (req, res) => {
  boardController.saveUserBoardStar(req, res);
});

router.delete('/:idBoard/boardstars', (req, res) => {
  boardController.removeUserBoardStar(req, res);
});

module.exports = router;