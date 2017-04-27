'use strict';

import jwt from 'jsonwebtoken';
import Boom from 'boom';

import { userModel } from '../../../models/index';
import { secret } from '../../../config/config';

import { buildResponse } from '../../../utils/responseService';

export const saveUser = (req, res) => {
  userModel.findOne({name: req.body.name})
    .then(user => {
      if (user) {
        throw Boom.create(400, 'That name is already taken');
      } else {
        const user = new userModel({
          name: req.body.name,
          fullname: req.body.fullname,
          password: req.body.password,
          initials: req.body.initials,
          email: req.body.email
        });

        return user.save();
      }
    })
    .then(user => {
      let payload = {
        'iss': 'users-microservice',
        'userId': user._id,
        'userName': user.name,
        'userEmail': user.email
      };

      buildResponse(200, jwt.sign(payload, secret), res)
    })
    .catch(error => {
      if (error.isBoom) {
        buildResponse(err.output.statusCode, error.message, res);
      } else {
        buildResponse(500, error, res)
      }
    });
};