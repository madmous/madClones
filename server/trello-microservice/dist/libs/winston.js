'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getLogger;

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getLogger(module) {
  var path = module.filename.split('/').slice(-2).join('/');

  return new _winston2.default.Logger({
    transports: [new _winston2.default.transports.Console({
      timestamp: function timestamp() {
        return new Date().toLocaleTimeString();
      },
      colorize: true,
      level: 'debug',
      label: path
    })]
  });
}