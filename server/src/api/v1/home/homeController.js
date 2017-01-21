'use strict';

const async = require ('async');

const models = require ('../../../models/index');
const config = require ('../../../config/config');
const log    = require ('../../../libs/winston')(module);

const objectIdRegex = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;

let homeController = {};

function formatResponse(pUser) {
  return {
    boards: pUser.boards,
    organizations: pUser.organizations,
    starredBoards: pUser.boardStars
  } 
}

homeController.getBoardsAndOrganizations = (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(404).json({
      data: {
        error: req.err
      }
    });
  } else {
    return res.status(200).json({
      data: formatResponse(user)
    });
	}
};

module.exports = homeController;