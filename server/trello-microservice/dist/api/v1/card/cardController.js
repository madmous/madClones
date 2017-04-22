'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveUserBoardCardItem = exports.saveUserBoardCard = exports.updateUserBoardCards = exports.getUserBoardCards = undefined;

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

var _winston = require('../../../libs/winston');

var _winston2 = _interopRequireDefault(_winston);

var _index = require('../../../models/index');

var _responseService = require('../../../utils/responseService');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var objectIdRegex = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
var log = (0, _winston2.default)(module);

var getUserBoardCards = exports.getUserBoardCards = function getUserBoardCards(req, res) {
  var reqUser = req.user;

  _index.cardsModel.findOne({ userId: req.user._id, boardId: req.params.idBoard }).then(function (cards) {
    if (!cards) {
      var response = {
        boards: reqUser.boards,
        organizations: reqUser.organizations,
        boardStars: reqUser.boardStars,
        cards: []
      };

      return (0, _responseService.buildResponse)(200, response, res);
    } else {
      var _response = {
        boards: reqUser.boards,
        organizations: reqUser.organizations,
        boardStars: reqUser.boardStars,
        cards: cards.cards
      };

      return (0, _responseService.buildResponse)(200, _response, res);
    }
  }).catch(function (error) {
    if (error.isBoom) {
      (0, _responseService.buildResponse)(error.output.statusCode, error.message, res);
    } else {
      (0, _responseService.buildResponse)(500, error, res);
    }
  });
};

var updateUserBoardCards = exports.updateUserBoardCards = function updateUserBoardCards(req, res) {
  _index.cardsModel.findOne({ userId: req.user._id, boardId: req.params.idBoard }).then(function (cards) {
    if (!cards) {
      (0, _responseService.buildResponse)(400, 'This board does not have any cards', res);
    } else {
      cards.cards = req.body.cards;

      return cards.save().then(function (cards) {
        return (0, _responseService.buildResponse)(200, cards.cards, res);
      }).catch(function (error) {
        return (0, _responseService.buildResponse)(500, error, res);
      });
    }
  }).catch(function (error) {
    log.error(error);

    (0, _responseService.buildResponse)(500, error, res);
  });
};

var saveCards = function saveCards(cards, res) {
  cards.save().then(function (cards) {
    return (0, _responseService.buildResponse)(200, cards.cards, res);
  }).catch(function (error) {
    return (0, _responseService.buildResponse)(500, error, res);
  });
};

var saveUserBoardCard = exports.saveUserBoardCard = function saveUserBoardCard(req, res) {
  _index.cardsModel.findOne({ userId: req.user._id, boardId: req.params.idBoard }).then(function (cards) {
    var card = new _index.cardModel({
      header: req.body.name
    });

    if (cards) {
      cards.cards.push(card);

      saveCards(cards, res);
    } else {
      var _cards = new _index.cardsModel({
        boardId: req.params.idBoard,
        userId: req.user._id,
        cards: card
      });

      saveCards(_cards, res);
    }
  }).catch(function (error) {
    return (0, _responseService.buildResponse)(500, error, res);
  });
};

var saveUserBoardCardItem = exports.saveUserBoardCardItem = function saveUserBoardCardItem(req, res) {
  _index.cardsModel.findOne({ userId: req.user._id, boardId: req.params.idBoard }).then(function (cards) {
    if (!cards) {
      throw _boom2.default.create(400, 'This board does not have any cards');
    } else {
      var card = cards.cards.id(req.params.idCard);

      if (!card) {
        throw _boom2.default.create(400, 'That card does not exist');
      } else {
        var cardItem = new _index.cardItemModel({
          name: req.body.name
        });

        card.cardItems.push(cardItem);

        return cards.save();
      }
    }
  }).then(function (cards) {
    return (0, _responseService.buildResponse)(200, cards.cards, res);
  }).catch(function (error) {
    if (error.isBoom) {
      (0, _responseService.buildResponse)(error.output.statusCode, error.message, res);
    } else {
      (0, _responseService.buildResponse)(500, error, res);
    }
  });
};