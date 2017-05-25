'use strict';

import Boom from 'boom';

import getLogger from '../../libs/winston';

import {
  cardItemModel,
  cardsModel,
  cardModel
} from '../../models/index';

import { buildResponse } from '../../utils/responseService';

const objectIdRegex = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
const log = getLogger(module);

export const getUserBoardCards = async (req, res) => {
  const reqUser = req.user;

  try {
    let cards = await cardsModel.findOne({ userId: req.user._id, boardId: req.params.idBoard });

    if (!cards) {
      const response = {
        boards: reqUser.boards,
        organizations: reqUser.organizations,
        boardStars: reqUser.boardStars,
        cards: []
      };

      return buildResponse(200, response, res);
    } else {
      const response = {
        boards: reqUser.boards,
        organizations: reqUser.organizations,
        boardStars: reqUser.boardStars,
        cards: cards.cards
      };

      return buildResponse(200, response, res);     
    }
  } catch (error) {
    log.error(error);

    if (error.isBoom) {
      buildResponse(error.output.statusCode, error.message, res)
    } else {
      buildResponse(401, error, res)
    }
  }
};

export const updateUserBoardCards = async (req, res) => {
  try {
    let cards = await cardsModel.findOne({ userId: req.user._id, boardId: req.params.idBoard });

    if (!cards) {
      buildResponse(400, 'This board does not have any cards', res);
    } else {
      cards.cards = req.body.cards;

      let savedCards = await cards.save();

      if (savedCards) {
        let response = {
          cards: cards.cards
        };

        buildResponse(200, response, res);
      }     
    }    
  } catch (error) {
    log.error(error);

    buildResponse(500, error, res);
  }
};

export const saveUserBoardCard = async (req, res) => {
  try {
    let cards = await cardsModel.findOne({ userId: req.user._id, boardId: req.params.idBoard });

    let card = new cardModel({
      header: req.body.name
    });

    if (cards) {
      cards.cards.push(card);

      try {
        let savedCards = await cards.save();

        if (savedCards) {
          let response = {
            cards: cards.cards
          };

          buildResponse(200, response, res);
        }
      } catch (error) {
        buildResponse(500, error, res);
      }
    } else {
      let cardsToSave = new cardsModel({
        boardId: req.params.idBoard,
        userId: req.user._id,
        cards: card
      });

      try {
        let savedCards = await cardsToSave.save();

        if (savedCards) {
          let response = {
            cards: savedCards.cards
          };

          buildResponse(200, response, res);
        }
      } catch (error) {
        buildResponse(500, error, res);
      }
    }
  } catch (error) {
    buildResponse(500, error, res);
  }
};

export const saveUserBoardCardItem = async (req, res) => {
  try {
    let cards = await  cardsModel.findOne({ userId: req.user._id, boardId: req.params.idBoard });

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

        try {
          let savedCards = await cards.save();
          
          if (savedCards) {
            let response = {
              cards: savedCards.cards
            };

            buildResponse(200, response, res);
          }
        } catch (error) {
          buildResponse(500, error, res);
        }
      }
    }
  } catch (error) {
    if (error.isBoom) {
      buildResponse(error.output.statusCode, error.message, res);
    } else {
      buildResponse(500, error, res)
    }
  }
};