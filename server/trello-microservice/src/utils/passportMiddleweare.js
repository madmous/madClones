import fetch from 'node-fetch';

import { usersMicroserviceUrl } from '../config/config'
import { userModel } from '../models/index';

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
        console.log(error)
      }
    }
  } else {
    req.err = 'Either the cookie or the token is missing';

    next();
  }
};