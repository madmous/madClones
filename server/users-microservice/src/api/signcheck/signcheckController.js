'use strict';

import { buildResponse } from '../../utils/responseService';
import { decodeToken } from '../../utils/tokenController';

export const save = (req, res) => {
  if (req.headers.jwt && req.headers.csrf) {
    let token = req.headers.jwt;
    let csrf = req.headers.csrf;

    let decodedToken = decodeToken(token);

    if (decodedToken.csrf == csrf) {
      let data = {
        name: decodedToken.userName,
        email: decodedToken.userEmail
      };

      buildResponse(200, data, res);
    } else {
      buildResponse(401, 'The token is not valid', res); 
    }
  } else {
    buildResponse(401, 'Token and/or Cookie missing', res);
  }
};