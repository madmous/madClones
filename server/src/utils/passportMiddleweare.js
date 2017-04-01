import { BasicStrategy } from 'passport-http';
import passport from 'passport';
import async from 'async';
import jwt from 'jwt-simple';

import { userModel } from '../models/index';
import { secret } from '../config/config';

import {
  ExtractJwt,
  Strategy 
} from 'passport-jwt';

passport.use(new BasicStrategy(
  function(username, password, callback) {

    userModel.findOne({ name: username }, function (err, user) {

      if (err) { 
				return callback(err); 
			}

      if (!user) { 
        return callback(null, { err: {usernameErr: 'There is not an account for this username' } }); 
			}

      user.arePasswordsMatching(password, function(err, isMatch) {
        
        if (err) { 
          return callback(err); 
        }

        if (!isMatch) { 
          return callback(null, { err: { passwordErr: 'Invalid password' } }); 
        }

        const token = jwt.encode(user._id, secret)

        return callback(null, { token: token });
      });
    });
  }
));

let opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = secret;

passport.use(new Strategy(opts, 
  function(jwt_payload, callback) {
    const userId = jwt_payload;
    
    userModel.findById(userId, function(err, user) {
      
      if (err) {
          return callback(err, false);
      }

      if (user) {
          return callback(null, user);
      } else {
          return callback(null, { err: 'There is not a user for this token' }); 
      }
    });
  }
));

export const authenticatedWithToken = passport.authenticate('jwt', { session : false });
export const authenticatedWithBasic = passport.authenticate('basic', { session : false });