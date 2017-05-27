'use strict';

import request from 'request';
import Boom from 'boom';

import { trelloMicroserviceUrl } from '../../config/config';
import { generateToken } from '../../utils/tokenController';
import { buildResponse } from '../../utils/responseService';
import { userModel } from '../../models/index';

export const saveUser = (req, res) => {
  userModel.findOne({name: req.body.name})
    .then(user => {
      if (user) {
        throw Boom.create(400, 'That name is already taken');
      } else {
        const user = new userModel({
          name: req.body.name,
          fullname: req.body.fullname,
          initials: req.body.initials,
          email: req.body.email,
          application: req.body.application,
          password: req.body.password
        });

        return user.save();
      }
    })
    .then(user => {
      request.post(
        `${trelloMicroserviceUrl}api/signup`,
        { json: {
          name: user.name,
          fullname: user.fullname,
          email: user.email
        } },
        function (error, res2, body) {
          if (!error && res2.statusCode === 200) {
            let { token, csrf } = generateToken(user.name, user.email, user._id);
        
            res.cookie('jwt', token, { httpOnly: true });
            buildResponse(200, csrf, res);
          } else {
            user
              .remove()
              .then(err => {
                if (err) {
                  buildResponse(500, err, res);
                } else {
                  buildResponse(500, 'The user was not created successfully', res);
                }
              })
          }
        }
      );
    })
    .catch(error => {
      if (error.isBoom) {
        buildResponse(error.output.statusCode, error.message, res);
      } else {
        buildResponse(500, error, res);
      }
    });
}; 