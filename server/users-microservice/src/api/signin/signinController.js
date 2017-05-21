'use strict';

import Boom from 'boom';

import { buildResponse } from '../../utils/responseService';
import { userModel } from '../../models/index';

export const getUser = async (req, res) => {
  const { token, csrf, err } = req.user;

  if (err) {
    buildResponse(err.code, err, res);
  } else {
    res.cookie('jwt', token, { httpOnly: true });

    buildResponse(200, csrf, res);
	}
};