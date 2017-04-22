'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _signUpValidation = require('./signUpValidation');

var _signUpController = require('./signUpController');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/').post((0, _expressValidation2.default)(_signUpValidation.saveUserSchema), _signUpController.saveUser);

exports.default = router;