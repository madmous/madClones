'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _organizationController = require('./organizationController');

var _organizationValidation = require('./organizationValidation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/').post((0, _expressValidation2.default)(_organizationValidation.saveOrganizationSchema), _organizationController.saveOrganization);

router.route('/:idOrganization').put((0, _expressValidation2.default)(_organizationValidation.updateOrganizationSchema), _organizationController.updateOrganization).delete((0, _expressValidation2.default)(_organizationValidation.removeOrganizationSchema), _organizationController.removeOrganization);

router.route('/:idOrganization/boards').post((0, _expressValidation2.default)(_organizationValidation.saveOrganizationBoardSchema), _organizationController.saveOrganizationBoard);

router.route('/:idOrganization/boards/:idBoard').put((0, _expressValidation2.default)(_organizationValidation.updateOrganizationBoardSchema), _organizationController.updateOrganizationBoard).delete((0, _expressValidation2.default)(_organizationValidation.removeOrganizationBoardSchema), _organizationController.removeOrganizationBoard);

router.route('/:idOrganization/boards/:idBoard/boardstars').post((0, _expressValidation2.default)(_organizationValidation.saveOrganizationBoardStarSchema), _organizationController.saveOrganizationBoardStar).delete((0, _expressValidation2.default)(_organizationValidation.removeOrganizationBoardStarSchema), _organizationController.removeOrganizationBoardStar);

exports.default = router;