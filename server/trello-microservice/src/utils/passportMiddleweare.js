'use strict';

import { BasicStrategy } from 'passport-http';
import passport from 'passport';
import request from 'request';

import { usersMicroserviceUrl } from '../config/config';
import { userModel } from '../models/index';
import getLogger from '../libs/winston';

const log = getLogger(module);

export const authenticatedWithToken = (req, res, next) => {
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

passport.use(new BasicStrategy(
  function(username, password, callback) {
    userModel.findOne({ name: username }, function (err, user) {
      if (err) { 
				return callback(err); 
			}

      if (!user) { 
        return callback(null, { err: {usernameErr: 'There is not an account for this username', code: 404 } });
			}

      request.post(
        `${usersMicroserviceUrl}api/signin`,
        { json: {
          username,
          password
        } },
        function (error, res2, body) {
          if (!error && res2.statusCode === 200) {
            let tokens = res2.body.data;

            return callback(null, tokens);
          } else {
            return callback(null, { err: {passwordErr: 'Wrong password', code: 401 } });
          }
        }
      );
    });
  }
));

export const authenticatedWithBasic = passport.authenticate('basic', { session : false });