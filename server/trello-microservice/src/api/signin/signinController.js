'use strict';

import request from 'request';
import Boom from 'boom';

import { buildResponse } from '../../utils/responseService';
import { userModel } from '../../models/index';

export const getUser = async (req, res) => {
  const user = req.user;
  const { err, token, csrf } = user;

  if (err) {
    buildResponse(err.code, err, res);
  } else {
    res.cookie('jwt', token, { domain: '', httpOnly: true, secure: false });

    buildResponse(200, csrf, res);
  }
};