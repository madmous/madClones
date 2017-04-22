'use strict';
'user strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.db = exports.dbTest = undefined;

var _winston = require('../libs/winston');

var _winston2 = _interopRequireDefault(_winston);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _config = require('../config/config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = (0, _winston2.default)(module);

_mongoose2.default.Promise = _bluebird2.default;

var dbTest = exports.dbTest = {};
var db = exports.db = {};

db.connect = function () {
  var mongooseConnection = _mongoose2.default.connection;

  _mongoose2.default.connect(_config.dbURI);

  mongooseConnection.on('connected', function () {
    log.info('Mongoose default connection connected to ' + _config.dbURI);
  });

  mongooseConnection.on('error', function (err) {
    log.error('Mongoose default connection error: ' + err);
  });

  mongooseConnection.on('disconnected', function () {
    log.info('Mongoose default connection disconnected');
  });

  process.on('SIGINT', function () {
    mongooseConnection.close(function () {
      log.info('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });
};

dbTest.connect = function () {
  var mongooseConnection = _mongoose2.default.connection;

  _mongoose2.default.connect(_config.dbTestURI);

  mongooseConnection.on('connected', function () {
    log.info('Mongoose default connection connected to ' + _config.dbTestURI);
  });

  mongooseConnection.on('error', function (err) {
    log.error('Mongoose default connection error: ' + err);
  });
};