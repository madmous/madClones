'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getBoardsAndOrganizations = exports.getBoardsAndOrganizations = function getBoardsAndOrganizations(req, res) {
  var user = req.user;

  if (!user) {
    return res.status(404).json({
      data: {
        error: req.err
      }
    });
  } else {
    return res.status(200).json({
      data: {
        boards: user.boards,
        organizations: user.organizations,
        boardStars: user.boardStars
      }
    });
  }
};