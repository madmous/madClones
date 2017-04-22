'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeOrganizationBoardStar = exports.saveOrganizationBoardStar = exports.removeOrganizationBoard = exports.updateOrganizationBoard = exports.saveOrganizationBoard = exports.removeOrganization = exports.updateOrganization = exports.saveOrganization = undefined;

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _index = require('../../../models/index');

var _userService = require('../../../utils/userService');

var _responseService = require('../../../utils/responseService');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var objectIdRegex = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;

var saveOrganization = exports.saveOrganization = function saveOrganization(req, res) {
  var user = req.user;

  var organization = new _index.organizationModel({
    name: req.body.name,
    displayName: req.body.displayName
  });

  user.organizations.push(organization);

  (0, _userService.saveUserService)(user, res);
};

var updateOrganization = exports.updateOrganization = function updateOrganization(req, res) {
  var user = req.user;
  var organization = user.organizations.id(req.params.idOrganization);

  if (!organization) {
    (0, _responseService.buildResponse)(404, 'That organization does not exist', res);
  } else {
    organization.name = req.body.name;
    organization.displayName = req.body.displayName;

    (0, _userService.saveUserService)(user, res);
  }
};

var removeOrganization = exports.removeOrganization = function removeOrganization(req, res) {
  var user = req.user;
  var organization = user.organizations.id(req.params.idOrganization);

  if (!organization) {
    (0, _responseService.buildResponse)(404, 'That organization does not exist', res);
  } else {
    organization.remove();

    (0, _userService.saveUserService)(user, res);
  }
};

var saveOrganizationBoard = exports.saveOrganizationBoard = function saveOrganizationBoard(req, res) {
  var user = req.user;

  var board = new _index.boardModel({
    name: req.body.name
  });

  var organization = user.organizations.id(req.params.idOrganization);

  if (!organization) {
    (0, _responseService.buildResponse)(404, 'That organization does not exist', res);
  } else {
    organization.boards.push(board);

    (0, _userService.saveUserService)(user, res);
  }
};

var updateOrganizationBoard = exports.updateOrganizationBoard = function updateOrganizationBoard(req, res) {
  var user = req.user;
  var organization = user.organizations.id(req.params.idOrganization);

  if (!organization) {
    (0, _responseService.buildResponse)(404, 'That organization does not exist', res);
  } else {
    var board = organization.boards.id(req.params.idBoard);

    if (!board) {
      (0, _responseService.buildResponse)(404, 'That board does not exist', res);
    } else {
      board.name = req.body.name;

      (0, _userService.saveUserService)(user, res);
    }
  }
};

var removeOrganizationBoard = exports.removeOrganizationBoard = function removeOrganizationBoard(req, res) {
  var user = req.user;
  var organization = user.organizations.id(req.params.idOrganization);

  if (!organization) {
    (0, _responseService.buildResponse)(404, 'That organization does not exist', res);
  } else {
    var board = organization.boards.id(req.params.idBoard);

    if (!board) {
      (0, _responseService.buildResponse)(404, 'That board does not exist', res);
    } else {
      board.remove();

      (0, _userService.saveUserService)(user, res);
    }
  }
};

var saveOrganizationBoardStar = exports.saveOrganizationBoardStar = function saveOrganizationBoardStar(req, res) {
  var user = req.user;
  var organization = user.organizations.id(req.params.idOrganization);

  if (!organization) {
    (0, _responseService.buildResponse)(404, 'That organization does not exist', res);
  } else {
    var board = organization.boards.id(req.params.idBoard);

    if (!board) {
      (0, _responseService.buildResponse)(404, 'That board does not exist', res);
    } else {
      board.isStarredBoard = true;

      var boardStar = new _index.boardStarModel({
        id: board.id,
        name: board.name,
        organizationName: organization.name,
        organizationId: organization.id
      });

      user.boardStars.push(boardStar);

      (0, _userService.saveUserService)(user, res);
    }
  }
};

var starredBoardIndex = function starredBoardIndex(starredBoards, boardId) {
  var starredBoardIndex = null;

  starredBoards.forEach(function (starredBoard, index) {
    if (starredBoard.id.equals(boardId)) {
      starredBoardIndex = index;
      return false;
    }
  });

  return starredBoardIndex;
};

var removeOrganizationBoardStar = exports.removeOrganizationBoardStar = function removeOrganizationBoardStar(req, res) {
  var user = req.user;
  var organization = user.organizations.id(req.params.idOrganization);

  if (!organization) {
    (0, _responseService.buildResponse)(404, 'That organization does not exist', res);
  } else {
    var board = organization.boards.id(req.params.idBoard);

    if (!board) {
      (0, _responseService.buildResponse)(404, 'That board does not exist', res);
    } else {
      if (!board.isStarredBoard) {
        (0, _responseService.buildResponse)(40, 'This board is not starred', res);
      } else {
        var index = starredBoardIndex(user.boardStars, board._id);

        if (index !== null) {
          board.isStarredBoard = false;

          user.boardStars[index].remove();
        }

        (0, _userService.saveUserService)(user, res);
      }
    }
  }
};