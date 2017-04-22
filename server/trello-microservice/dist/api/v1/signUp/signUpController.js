'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveUser = undefined;

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

var _jwtSimple = require('jwt-simple');

var _jwtSimple2 = _interopRequireDefault(_jwtSimple);

var _index = require('../../../models/index');

var _config = require('../../../config/config');

var _responseService = require('../../../utils/responseService');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var saveUser = exports.saveUser = function saveUser(req, res) {
  _index.userModel.findOne({ name: req.body.name }).then(function (user) {
    if (user) {
      throw _boom2.default.create(400, 'That name is already taken');
    } else {
      var _user = new _index.userModel({
        name: req.body.name,
        fullname: req.body.fullname,
        password: req.body.password,
        initials: req.body.initials,
        email: req.body.email
      });

      return _user.save();
    }
  }).then(function (user) {
    return (0, _responseService.buildResponse)(200, _jwtSimple2.default.encode(user._id, _config.secret), res);
  }).catch(function (error) {
    if (error.isBoom) {
      (0, _responseService.buildResponse)(err.output.statusCode, error.message, res);
    } else {
      (0, _responseService.buildResponse)(500, error, res);
    }
  });
};