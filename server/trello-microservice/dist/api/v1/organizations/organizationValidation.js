'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeOrganizationBoardStarSchema = exports.saveOrganizationBoardStarSchema = exports.removeOrganizationBoardSchema = exports.updateOrganizationBoardSchema = exports.saveOrganizationBoardSchema = exports.removeOrganizationSchema = exports.updateOrganizationSchema = exports.saveOrganizationSchema = undefined;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mongooseIdRegex = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;

var saveOrganizationSchema = exports.saveOrganizationSchema = {
  body: {
    name: _joi2.default.string().required(),
    displayName: _joi2.default.string().required()
  }
};

var updateOrganizationSchema = exports.updateOrganizationSchema = {
  body: {
    name: _joi2.default.string().required(),
    displayName: _joi2.default.string().required()
  },
  params: {
    idOrganization: _joi2.default.string().regex(mongooseIdRegex)
  }
};

var removeOrganizationSchema = exports.removeOrganizationSchema = {
  params: {
    idOrganization: _joi2.default.string().regex(mongooseIdRegex)
  }
};

var saveOrganizationBoardSchema = exports.saveOrganizationBoardSchema = {
  body: {
    name: _joi2.default.string().required()
  },
  params: {
    idOrganization: _joi2.default.string().regex(mongooseIdRegex)
  }
};

var updateOrganizationBoardSchema = exports.updateOrganizationBoardSchema = {
  body: {
    name: _joi2.default.string().required()
  },
  params: {
    idOrganization: _joi2.default.string().regex(mongooseIdRegex)
  }
};

var removeOrganizationBoardSchema = exports.removeOrganizationBoardSchema = {
  params: {
    idOrganization: _joi2.default.string().regex(mongooseIdRegex),
    idBoard: _joi2.default.string().regex(mongooseIdRegex)
  }
};

var saveOrganizationBoardStarSchema = exports.saveOrganizationBoardStarSchema = {
  params: {
    idOrganization: _joi2.default.string().regex(mongooseIdRegex),
    idBoard: _joi2.default.string().regex(mongooseIdRegex)
  }
};

var removeOrganizationBoardStarSchema = exports.removeOrganizationBoardStarSchema = {
  params: {
    idOrganization: _joi2.default.string().regex(mongooseIdRegex),
    idBoard: _joi2.default.string().regex(mongooseIdRegex)
  }
};