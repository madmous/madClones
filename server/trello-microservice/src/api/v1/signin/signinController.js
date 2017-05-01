'use strict';

import Boom from 'boom';

import { buildResponse } from '../../../utils/responseService';
import { userModel } from '../../../models/index';

export const getUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    
    let user = await userModel.findOne({name, email});

    if (user) {
      buildResponse(200, user, res);
    } else {
      throw Boom.create(404, 'There is not an account for this name and email');
    }
  } catch (error) {
    if (error.isBoom) {
      buildResponse(error.output.statusCode, error.message, res);
    } else {
      buildResponse(401, error, res);
    }
  }
};