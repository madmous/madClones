'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeUser = exports.updateUser = exports.getUser = undefined;

var _index = require('../../../models/index');

var buildResponse = function buildResponse(statusCode, data, res) {
  if (statusCode === 200) {
    return res.status(200).json({
      data: {
        user: {
          _id: data._id,
          fullname: data.fullname
        }
      }
    });
  } else {
    return res.status(statusCode).json({
      data: data
    });
  }
};

var getUser = exports.getUser = function getUser(req, res) {
  var user = req.user;

  if (!user) {
    buildResponse(404, req.err, res);
  } else {
    buildResponse(200, user, res);
  }
};

var updateUser = exports.updateUser = function updateUser(req, res) {
  var errorMessage = 'Sorry. I could not update that user';
  var user = req.user;

  user.name = req.body.name;
  user.fullname = req.body.fullname;
  user.initials = req.body.initials;

  user.save().then(function (user) {
    return buildResponse(200, user, res);
  }).catch(function (error) {
    return buildResponse(404, errorMessage, res);
  });
};

var removeUser = exports.removeUser = function removeUser(req, res) {
  var errorMessage = 'Sorry. I could not remove that user';
  var user = req.user;

  user.remove().then(function (user) {
    return buildResponse(200, user, res);
  }).catch(function (error) {
    return buildResponse(404, errorMessage, res);
  });
};