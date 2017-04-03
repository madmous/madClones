'use strict';

import getLogger from '../../../libs/winston';

import {
  cardItemModel,
  cardsModel,
  cardModel
} from '../../../models/index';

import { buildResponse } from '../../../utils/responseService';

const objectIdRegex = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
const log = getLogger(module);

export const getUserBoardCards = (req, res) => {
  const reqUser = req.user;

  if (!objectIdRegex.test(req.params.idBoard)) {
    buildResponse(400, 'Please enter a valid board id', res);
  } else {
    cardsModel.findOne({ userId: req.user._id, boardId: req.params.idBoard })
      .then(cards => {
        if (!cards) {
          buildResponse(400, 'The board associated to that user does not exist', res);
        } else {
          buildResponse(200, cards, res)          
        }
      })
      .catch(error => buildResponse(500, error, res));
  }
};

export const updateUserBoardCards= (req, res) => {
  if (!objectIdRegex.test(req.params.idBoard)) {
    buildResponse(400, 'Please enter a valid board id', res);
  } else if (!req.body.cards) {
    buildResponse(400, 'Please add cards to update', res);
  } else {

    cardsModel.findOne({ userId: req.user._id, boardId: req.params.idBoard })
      .then(cards => {
        if (!cards) {
          buildResponse(400, 'The board associated to that user does not exist', res);
        } else {
          cards.cards = req.body.cards;

          return cards.save()
            .then(cards => buildResponse(200, cards.cards, res))
            .catch(error => buildResponse(500, error, res));         
        }
      })
      .catch(error => {
        log.error(error);

        buildResponse(500, error, res);
      });
  }
};

const saveCards = (cards, res) => {
  cards.save()
    .then(cards => buildResponse(200, cards.cards, res))
    .catch(error => buildResponse(500, error, res));
};

// TODO : test boardId is a valid existing board
export const saveUserBoardCard = (req, res) => {
  if (!req.body.name) {
    buildResponse(400, 'Please enter a card name', res);
  } else {
    cardsModel.findOne({ userId: req.user._id, boardId: req.params.idBoard })
      .then(cards => {
        let card = new cardModel({
          header: req.body.name
        });

        if (cards) {
          cards.cards.push(card);

          saveCards(cards, res);
        } else {
          let cards = new cardsModel({
            boardId: req.params.idBoard,
            userId: req.user._id,
            cards: card
          });

          saveCards(cards, res);
        }
      })
      .catch(error => buildResponse(500, error, res));
  }
};

export const saveUserBoardCardItem = (req, res) => {
  if (!req.body.name) {
    buildResponse(400, 'Please enter a card item name', res);
  } else {
    cardsModel.findOne({ userId: req.user._id, boardId: req.params.idBoard })
      .then(cards => {
        if (!cards) {
          buildResponse(404, 'This user does not have any cards', res);
        } else {
          let card = cards.cards.id(req.params.idCard);

          if (!card) {
            buildResponse(404, 'That card does not exist', res);
          } else {
            let cardItem = new cardItemModel({
              name: req.body.name
            })

            card.cardItems.push(cardItem);

            return cards.save();
          }
        }
      })
      .then(cards => buildResponse(200, cards.cards, res))
      .catch(error => buildResponse(500, error, res));
  }
};