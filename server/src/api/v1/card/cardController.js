'use strict';

const async = require ('async');

const models = require ('../../../models/index');
const config = require ('../../../config/config');
const log    = require ('../../../libs/winston')(module);

const cardItemModel = models.cardItemModel;
const cardsModel    = models.cardsModel;
const cardModel     = models.cardModel;

const objectIdRegex = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;

let cardController = {};

function formatResponse(user, cards) {
  return {
    boards: user.boards,
    organizations: user.organizations,
    starredBoards: user.boardStars,
    cards: cards
  }
}

cardController.getUserBoardCards = (req, res) => {
  const reqUser = req.user;

  if (!objectIdRegex.test(req.params.idBoard)) {
    return res.status(400).json({
      data: {
        error: 'Please enter a valid board id'
      }
    });
  } else {
    async.waterfall([
      (callback) => {
        cardsModel.findOne({ userId: req.user._id, boardId: req.params.idBoard }, callback);
      },
      (cards, callback) => {
        if (!cards) {
          callback('The board associated to that user does not exist');
        } else {
          callback(null, cards);
        }
      }
    ], (error, cards) => { 
      if (error) {
        return res.status(400).json({
          data: {
            error
          }
        });
      } 

      return res.status(200).json({
        data: formatResponse(reqUser, cards.cards)
      });
    });
  }
}

cardController.updateUserBoardCards = (req, res) => {
  if (!objectIdRegex.test(req.params.idBoard)) {
    return res.status(400).json({
      data: {
        error: 'Please enter a valid board id'
      }
    });
  } else if (!req.body.cards) {
    return res.status(400).json({
      data: {
        error: 'Please add cards'
      }
    });
  } else {
    async.waterfall([
      (callback) => {
        cardsModel.findOne({ userId: req.user._id, boardId: req.params.idBoard }, callback);
      },
      (cards, callback) => {
        if (!cards) {
          callback('The board associated to that user does not exist');
        } else {
          cards.cards = req.body.cards;

          cards.save(callback);
        }
      },
      (cards, numRowAffected, callback) => {
        if (!cards) {
          callback('Error while saving the card');
        } else {
          callback(null, cards);    
        }
      }
    ], (error, cards) => { 
      if (error) {
        return res.status(400).json({
          data: {
            error
          }
        });
      } 

      return res.status(200).json({
        data: cards.cards
      });
    });
  }
}

// TODO : test boardId is a valid existing board
cardController.saveUserBoardCard = (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({
      data: {
        uiError: 'Please enter a card name'
      }
    });
  } else {
    async.waterfall([
      (callback) => {
        cardsModel.findOne({ userId: req.user._id, boardId: req.params.idBoard }, callback);
      },
      (cards, callback) => {
        let card = new cardModel({
          header: req.body.name
        })

        if (cards) {
          cards.cards.push(card);

          cards.save(callback);
        } else {
          let cards = new cardsModel({
            boardId: req.params.idBoard,
            userId: req.user._id,
            cards: card
          });

          cards.save(callback);
        }
      },
      (cards, numRowAffected, callback) => {
        if (!cards) {
          callback('Error while saving the card');
        } else {
          callback(null, cards);    
        }
      }
    ], (error, cards) => { 
      if (error) {
        return res.status(400).json({
          data: {
            error
          }
        });
      } 

      return res.status(200).json({
        data: cards.cards
      });
    });
  }
};

cardController.saveUserBoardCardItem = (req, res) => {

  if (!req.body.name) {
    return res.status(400).json({
      data: {
        uiError: 'Please enter a card item name'
      }
    });
  } else {
    async.waterfall([
      (callback) => {
        cardsModel.findOne({ userId: req.user._id, boardId: req.params.idBoard }, callback);
      },
      (cards, callback) => {
        if (cards === undefined) {
          callback('This user does not have any cards');
        } else {
          let card = cards.cards.id(req.params.idCard);

          if (card === undefined) {
            callback('That card does not exist');
          } else {
            let cardItem = new cardItemModel({
              name: req.body.name
            })

            card.cardItems.push(cardItem);
            cards.save(callback);
          }
        }
      },
      (cards, numRowAffected, callback) => {
        if (!cards) {
          callback('Error while saving the card');
        } else {
          callback(null, cards);    
        }
      }
    ], (error, cards) => { 
      if (error) {
        return res.status(400).json({
          data: {
            error
          }
        });
      } 

      return res.status(200).json({
        data: cards.cards
      });
    });
  }
};

module.exports = cardController;