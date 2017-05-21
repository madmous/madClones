'use strict';

import request from 'request';

import { usersMicroserviceUrl } from '../config/config';
import { userModel } from '../models/index';
import getLogger from '../libs/winston';

const log = getLogger(module);

export const authenticatedWithToken = async (req, res, next) => {
  if (req && req.cookies && req.cookies.jwt && req.headers && req.headers.csrf) {
    let csrf = req.headers.csrf;
    let jwt = req.cookies.jwt;

    const options = {
      uri: `${usersMicroserviceUrl}api/signcheck`,
      method: 'GET',
      headers: {
        csrf,
        jwt
      },
      json: true
    };

    request(options, function (error, res2, body) {
      if (error) {
        next();
      } else {
        userModel
          .findOne({name: body.data.name})
          .then(user => {
            if (user) {
              req.user = user;
              next();
            }
          })
          .catch(err => {
            const msg = 'User not found';

            log.error(msg);
            req.err = msg;
            next();
          });
      }
    });
  } else {
    const msg = 'Either the cookie or the token is missing';

    log.error(msg);
    req.err = msg;

    next();
  }
};