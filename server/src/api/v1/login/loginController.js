'use strict';

const async = require ('async');

const models = require ('../../../models/index');
const config = require ('../../../config/config');
const log    = require ('../../../libs/winston')(module);

const userModel = models.userModel;

let loginController = {};

loginController.authenticate = (req, res) => {

	const reqUser = req.user;

  if (reqUser.err) {
    return res.status(401).json({
      data: {
        uiError : reqUser.err
      }
    });
  } else {
    return res.status(200).json({
      data: {
				token: reqUser.token
			}
    });
	}
};

module.exports = loginController;