'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BoardSchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var BoardSchema = exports.BoardSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  isClosed: {
    type: Boolean
  },
  createdAt: {
    type: Date
  },
  isStarredBoard: {
    type: Boolean,
    default: false
  }
});

exports.default = _mongoose2.default.model('Board', BoardSchema);