'use strict';

import request from 'request';
import Boom from 'boom';

import { buildResponse } from '../../../utils/responseService';
import { userModel } from '../../../models/index';

export const getUser = async (req, res) => {
  const user = req.user;

  if (user) {

    res.cookie('jwt', user.token, { domain: '', httpOnly: true, secure: false });

    buildResponse(200, user.csrf, res);
  } else {
    throw Boom.create(404, 'There is not an account for this name and email');
  }
};