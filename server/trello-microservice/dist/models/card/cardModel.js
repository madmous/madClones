'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardItemsSchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _cardItemModel = require('../cardItem/cardItemModel');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var CardItemsSchema = exports.CardItemsSchema = new Schema({
  header: {
    type: String,
    required: true
  },
  cardItems: [_cardItemModel.CardItemSchema]
});

exports.default = _mongoose2.default.model('CardItems', CardItemsSchema);