'use strict';

import Boom from 'boom';

import { buildResponse } from '../../utils/responseService';
import { userModel } from '../../models/index';

import { generateToken } from '../../utils/tokenController';

export const getUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await userModel.findOne({ name: username });

    if (!user) {
      buildResponse(404, 'User not found', res);
    } else {
      user.arePasswordsMatching(password, function(err, isMatch) {
        if (err) { 
          return buildResponse(500, err, res);
        }

        if (!isMatch) {
          return buildResponse(401, { passwordErr: 'Invalid password', code: 401 }, res);
        }

        const { token, csrf } = generateToken(user.name, user.email, user._id);

        return buildResponse(200, { csrf, token }, res);
      });
    }
  } catch (err) {
    buildResponse(500, err, res);
  }
};