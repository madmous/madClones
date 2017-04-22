'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUserSchema = undefined;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var updateUserSchema = exports.updateUserSchema = {
  body: {
    name: _joi2.default.string().required(),
    fullname: _joi2.default.string().required(),
    initials: _joi2.default.string().required()
  }
};