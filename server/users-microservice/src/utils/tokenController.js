'use strict';

import jwt from 'jsonwebtoken';
import uuid from 'uuid';

import { jwtSecret } from '../config/config';

export const generateToken = (name, email, id) => {
  let tokenIdentifier = uuid.v4() + uuid.v4();

  let payload = {
    iss: 'users_microservice',
    sub: 'user_token',
    csrf: tokenIdentifier,
    iat: Math.floor(Date.now() / 1000) - 30 ,
    userName: name,
    userEmail: email,
    userId: id
  };

  let token = jwt.sign(payload, jwtSecret);

  let csrf =  {
    'csrf': tokenIdentifier
  };

  return {
    token,
    csrf
  };
};

export const decodeToken = token => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch(err) {
    
  }
};