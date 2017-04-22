'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardsSchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _cardModel = require('../card/cardModel');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var CardsSchema = exports.CardsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  boardId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  cards: [_cardModel.CardItemsSchema]
});

exports.default = _mongoose2.default.model('Cards', CardsSchema);