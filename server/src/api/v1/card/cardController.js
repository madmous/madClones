'use strict';

import Boom from 'boom';

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

  cardsModel.findOne({ userId: req.user._id, boardId: req.params.idBoard })
    .then(cards => {
      if (!cards) {
        throw Boom.create(404, 'This board does not have any card');
      } else {
        const response = {
          boards: reqUser.boards,
          organizations: reqUser.organizations,
          boardStars: reqUser.boardStars,
          cards: cards.cards
        };

        return buildResponse(200, response, res);     
      }
    })
    .catch(error => {
      if (error.isBoom) {
        buildResponse(error.output.statusCode, error.message, res)
      } else {
        buildResponse(500, error, res)
      }
    });
};

export const updateUserBoardCards= (req, res) => {
  cardsModel.findOne({ userId: req.user._id, boardId: req.params.idBoard })
    .then(cards => {
      if (!cards) {
        buildResponse(400, 'This board does not have any cards', res);
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
};

const saveCards = (cards, res) => {
  cards.save()
    .then(cards => buildResponse(200, cards.cards, res))
    .catch(error => buildResponse(500, error, res));
};

export const saveUserBoardCard = (req, res) => {
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
};

export const saveUserBoardCardItem = (req, res) => {
  cardsModel.findOne({ userId: req.user._id, boardId: req.params.idBoard })
    .then(cards => {
      if (!cards) {
        throw Boom.create(400, 'This board does not have any cards');
      } else {
        let card = cards.cards.id(req.params.idCard);

        if (!card) {
          throw Boom.create(400, 'That card does not exist');
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
    .catch(error => {
      if (error.isBoom) {
        buildResponse(error.output.statusCode, error.message, res);
      } else {
        buildResponse(500, error, res)
      }
    });
};