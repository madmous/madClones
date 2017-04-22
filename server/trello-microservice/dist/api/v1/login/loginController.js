'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticate = authenticate;

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _index = require('../../../models/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function authenticate(req, res) {
  var reqUser = req.user;

  if (reqUser.err) {
    return res.status(401).json({
      data: {
        uiError: reqUser.err
      }
    });
  } else {
    return res.status(200).json({
      data: {
        token: reqUser.token
      }
    });
  }
};