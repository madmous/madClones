'use strict';

const async = require ('async');

const models = require ('../../../models/index');
const config = require ('../../../config/config');
const log    = require ('../../../libs/winston')(module);

const userModel = models.userModel;

let loginController = {};

loginController.authenticate = (req, res) => {

	const token = req.user;

  if (!token) {
    return res.status(404).json({
      error : req.err
    });
  } else {
    return res.status(200).json({
      data: {
				token: token
			}
    });
	}
};

module.exports = loginController;