import fetch from 'node-fetch';

import { usersMicroserviceUrl } from '../config/config'
import { userModel } from '../models/index';
import getLogger from '../libs/winston';

const log = getLogger(module);

export const authenticatedWithToken = async (req, res, next) => {
  if (req && req.cookies && req.cookies.jwt && req.headers && req.headers.csrf) {
    let csrf = req.headers.csrf;
    let jwt = req.cookies.jwt;

    const opts = {
      headers: {
        csrf,
        jwt
      }
    };

    try {
      let res = await fetch(`${usersMicroserviceUrl}/signcheck`, opts);
      let data = await res.json();

      if (res.status === 401) {
        return null;
      }

      if (!data) {
        next();
      } else {
        try {
          let user = await userModel.findOne({name: data.name});

          if (user) {
            req.user = user;
            next();
          }
        } catch (error) {
          log.error('User not found');
          req.err = 'User not found';
          next();
        }
      }
    } catch (error) {
      log.error('The sign check failed');
      req.err = 'The sign check failed';
      next();
    }
  } else {
    log.error('Either the cookie or the token is missing');
    req.err = 'Either the cookie or the token is missing';

    next();
  }
};