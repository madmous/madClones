'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeUserBoardStar = exports.saveUserBoardStar = exports.renameBoardName = exports.removeUserBoard = exports.saveUserBoard = undefined;

var _index = require('../../../models/index');

var _userService = require('../../../utils/userService');

var _responseService = require('../../../utils/responseService');

var objectIdRegex = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;

var saveUserBoard = exports.saveUserBoard = function saveUserBoard(req, res) {
  if (!req.body.name) {
    (0, _responseService.buildResponse)(400, 'Please enter a board name', res);
  } else {
    var user = req.user;

    var board = new _index.boardModel({
      name: req.body.name
    });

    user.boards.push(board);
    (0, _userService.saveUserService)(user, res);
  }
};

var removeUserBoard = exports.removeUserBoard = function removeUserBoard(req, res) {
  var user = req.user;
  var board = user.boards.id(req.params.idBoard);

  if (!board) {
    (0, _responseService.buildResponse)(404, 'That board does not exist', res);
  } else {
    board.remove();
    (0, _userService.saveUserService)(user, res);
  }
};

var renameBoardName = exports.renameBoardName = function renameBoardName(req, res) {
  var user = req.user;
  var board = user.boards.id(req.params.idBoard);

  if (!board) {
    (0, _responseService.buildResponse)(404, 'That board does not exist', res);
  } else {
    board.name = req.body.name;

    (0, _userService.saveUserService)(user, res);
  }
};

var saveUserBoardStar = exports.saveUserBoardStar = function saveUserBoardStar(req, res) {
  var user = req.user;
  var board = user.boards.id(req.params.idBoard);

  if (!board) {
    (0, _responseService.buildResponse)(404, 'That board does not exist', res);
  } else {
    board.isStarredBoard = true;

    var boardStar = new _index.boardStarModel({
      id: board.id,
      name: board.name
    });

    user.boardStars.push(boardStar);
    (0, _userService.saveUserService)(user, res);
  }
};

var removeUserBoardStar = exports.removeUserBoardStar = function removeUserBoardStar(req, res) {
  var user = req.user;
  var board = user.boards.id(req.params.idBoard);

  if (!board) {
    (0, _responseService.buildResponse)(404, 'That board does not exist', res);
  } else {
    if (!board.isStarredBoard) {
      (0, _responseService.buildResponse)(400, 'This board is not starred', res);
    } else {
      var index = user.boardStars.findIndex(function (starredBoard) {
        return starredBoard.id.equals(board._id);
      });

      if (index === -1) {
        (0, _responseService.buildResponse)(400, 'This board is not starred', res);
      } else {
        board.isStarredBoard = false;

        user.boardStars[index].remove();
        (0, _userService.saveUserService)(user, res);
      }
    }
  }
};