'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardItemSchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var CardItemSchema = exports.CardItemSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

exports.default = _mongoose2.default.model('CardItem', CardItemSchema);