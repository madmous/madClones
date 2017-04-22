'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeUserBoardStarSchema = exports.saveUserBoardStarSchema = exports.removeUserBoardSchema = exports.renameBoardNameSchema = exports.saveUserBoardSchema = undefined;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var saveUserBoardSchema = exports.saveUserBoardSchema = {
  body: {
    name: _joi2.default.string().required()
  }
};

var renameBoardNameSchema = exports.renameBoardNameSchema = {
  body: {
    name: _joi2.default.string().required()
  }
};

var removeUserBoardSchema = exports.removeUserBoardSchema = {
  params: {
    idBoard: _joi2.default.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)
  }
};

var saveUserBoardStarSchema = exports.saveUserBoardStarSchema = {
  params: {
    idBoard: _joi2.default.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)
  }
};

var removeUserBoardStarSchema = exports.removeUserBoardStarSchema = {
  params: {
    idBoard: _joi2.default.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)
  }
};