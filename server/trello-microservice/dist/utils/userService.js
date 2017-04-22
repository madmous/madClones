'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeUserService = exports.saveUserService = undefined;

var _responseService = require('./responseService');

var saveUserService = exports.saveUserService = function saveUserService(user, res) {
  user.save().then(function (user) {
    return (0, _responseService.buildResponse)(200, user, res);
  }).catch(function (error) {
    return (0, _responseService.buildResponse)(404, errorMessage, res);
  });
};

var removeUserService = exports.removeUserService = function removeUserService(user, res) {
  user.remove().then(function (user) {
    return (0, _responseService.buildResponse)(200, user, res);
  }).catch(function (error) {
    return (0, _responseService.buildResponse)(404, errorMessage, res);
  });
};