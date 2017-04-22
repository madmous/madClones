'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrganizationSchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _boardModel = require('../boards/boardModel');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var OrganizationSchema = exports.OrganizationSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  boards: [_boardModel.BoardSchema]
});

exports.default = _mongoose2.default.model('Organization', OrganizationSchema);