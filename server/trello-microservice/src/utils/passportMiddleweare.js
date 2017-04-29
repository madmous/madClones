import fetch from 'node-fetch';

import { userModel } from '../models/index';

export const authenticatedWithToken = (req, res, next) => {
  let csrf;
  let jwt;

  if (req && req.cookies && req.headers){
    csrf = req.headers.csrf;
    jwt = req.cookies.jwt;

    const opts = {
      headers: {
        csrf,
        jwt
      }
    };

    fetch('http://localhost:3002/signcheck', opts)
      .then(res => {
        if (res.status === 401) {
          return null;
        }

        return res.json();
      })
      .then(user => {
        if (!user) {
          return next();
        } else {
          return userModel.findOne({name: user.name})
            .then(user => {
              req.user = user;
              
              return next();
          });
        }
      })
  }
};