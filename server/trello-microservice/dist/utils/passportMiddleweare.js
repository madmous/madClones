'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticatedWithBasic = exports.authenticatedWithToken = undefined;

var _passportHttp = require('passport-http');

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _jwtSimple = require('jwt-simple');

var _jwtSimple2 = _interopRequireDefault(_jwtSimple);

var _index = require('../models/index');

var _config = require('../config/config');

var _passportJwt = require('passport-jwt');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_passport2.default.use(new _passportHttp.BasicStrategy(function (username, password, callback) {

  _index.userModel.findOne({ name: username }, function (err, user) {

    if (err) {
      return callback(err);
    }

    if (!user) {
      return callback(null, { err: { usernameErr: 'There is not an account for this username' } });
    }

    user.arePasswordsMatching(password, function (err, isMatch) {

      if (err) {
        return callback(err);
      }

      if (!isMatch) {
        return callback(null, { err: { passwordErr: 'Invalid password' } });
      }

      var token = _jwtSimple2.default.encode(user._id, _config.secret);

      return callback(null, { token: token });
    });
  });
}));

var opts = {};

opts.jwtFromRequest = _passportJwt.ExtractJwt.fromAuthHeader();
opts.secretOrKey = _config.secret;

_passport2.default.use(new _passportJwt.Strategy(opts, function (jwt_payload, callback) {
  var userId = jwt_payload;

  _index.userModel.findById(userId, function (err, user) {

    if (err) {
      return callback(err, false);
    }

    if (user) {
      return callback(null, user);
    } else {
      return callback(null, { err: 'There is not a user for this token' });
    }
  });
}));

var authenticatedWithToken = exports.authenticatedWithToken = _passport2.default.authenticate('jwt', { session: false });
var authenticatedWithBasic = exports.authenticatedWithBasic = _passport2.default.authenticate('basic', { session: false });