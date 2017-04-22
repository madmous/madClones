'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var dbURI = exports.dbURI = function () {
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    return 'mongodb://localhost/trelloCloneApi';
  } else {
    return 'mongodb://mongo:27017/trelloCloneApi';
  }
}();

var port = exports.port = function () {
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    return 3001;
  } else {
    return 80;
  }
}();

var dbTestURI = exports.dbTestURI = 'mongodb://localhost/trelloCloneApiTest';

var secret = exports.secret = 'apiTest';