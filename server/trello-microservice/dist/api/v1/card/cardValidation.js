'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveUserBoardCardItemSchema = exports.saveUserBoardCardSchema = exports.updateUserBoardCardsSchema = exports.getUserBoardCardsSchema = undefined;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getUserBoardCardsSchema = exports.getUserBoardCardsSchema = {
  params: {
    idBoard: _joi2.default.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)
  }
};

var updateUserBoardCardsSchema = exports.updateUserBoardCardsSchema = {
  body: {
    cards: _joi2.default.array().required()
  },
  params: {
    idBoard: _joi2.default.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)
  }
};

var saveUserBoardCardSchema = exports.saveUserBoardCardSchema = {
  body: {
    name: _joi2.default.string().required()
  },
  params: {
    idBoard: _joi2.default.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)
  }
};

var saveUserBoardCardItemSchema = exports.saveUserBoardCardItemSchema = {
  body: {
    name: _joi2.default.string().required()
  },
  params: {
    idBoard: _joi2.default.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i),
    idCard: _joi2.default.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)
  }
};