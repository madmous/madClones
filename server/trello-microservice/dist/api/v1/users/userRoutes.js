'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _userValidation = require('./userValidation');

var _userController = require('./userController');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/').get(_userController.getUser).put((0, _expressValidation2.default)(_userValidation.updateUserSchema), _userController.updateUser).delete(_userController.removeUser);

exports.default = router;