'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.homeRoutes = exports.userRoutes = exports.loginRoutes = exports.boardRoutes = exports.signUpRoutes = exports.organizationRoutes = undefined;

var _organizationRoutes = require('./organizations/organizationRoutes');

var _organizationRoutes2 = _interopRequireDefault(_organizationRoutes);

var _signUpRoutes = require('./signUp/signUpRoutes');

var _signUpRoutes2 = _interopRequireDefault(_signUpRoutes);

var _boardRoutes = require('./board/boardRoutes');

var _boardRoutes2 = _interopRequireDefault(_boardRoutes);

var _loginRoutes = require('./login/loginRoutes');

var _loginRoutes2 = _interopRequireDefault(_loginRoutes);

var _userRoutes = require('./users/userRoutes');

var _userRoutes2 = _interopRequireDefault(_userRoutes);

var _homeRoutes = require('./home/homeRoutes');

var _homeRoutes2 = _interopRequireDefault(_homeRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.organizationRoutes = _organizationRoutes2.default;
exports.signUpRoutes = _signUpRoutes2.default;
exports.boardRoutes = _boardRoutes2.default;
exports.loginRoutes = _loginRoutes2.default;
exports.userRoutes = _userRoutes2.default;
exports.homeRoutes = _homeRoutes2.default;