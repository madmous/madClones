'use strict';

const async = require ('async');

const models = require ('../../../models/index');
const config = require ('../../../config/config');
const log    = require ('../../../libs/winston')(module);

const userModel = models.userModel;

let loginController = {};

function formatResponse(pUser) {
  return {
    user: {
      _id: pUser._id,
      fullname: pUser.fullname,
    },
    boards: pUser.boards,
    organizations: pUser.organizations,
    starredBoards: pUser.boardStars
  } 
}

loginController.authenticate = (req, res) => {

	if (req.err) {
		return res.status(400).json({
			data: {
				error: req.err
			}
		});
	} else if(req.user) {
		return res.status(200).json({
			data: formatResponse(req.user)
		});
	}
};

module.exports = loginController;