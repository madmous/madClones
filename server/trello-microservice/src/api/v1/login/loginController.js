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
    res.cookie('jwt', reqUser.token, { httpOnly: true });

    return res.status(200).json({
      data: {
				message: 'success'
			}
    });
	}
};