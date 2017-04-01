'use strict';

import async from 'async';

import { userModel } from '../../../models/index';

export function authenticate(req, res) {
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