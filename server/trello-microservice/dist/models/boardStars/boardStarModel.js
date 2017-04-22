'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BoardStarSchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var BoardStarSchema = exports.BoardStarSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  organizationName: {
    type: String
  },
  organizationId: {
    type: Schema.Types.ObjectId
  },
  isStarredBoard: {
    type: Boolean,
    default: true
  }
});

exports.default = _mongoose2.default.model('BoardStar', BoardStarSchema);