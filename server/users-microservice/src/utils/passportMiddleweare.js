import { BasicStrategy } from 'passport-http';
import passport from 'passport';

import { userModel } from '../models/index';
import { secret } from '../config/config';

import { generateToken } from './tokenController';

passport.use(new BasicStrategy(
  function(username, password, callback) {
    userModel.findOne({ name: username }, function (err, user) {

      if (err) { 
				return callback(err); 
			}

      if (!user) { 
        return callback(null, { err: {usernameErr: 'There is not an account for this username', code: 404 } }); 
			}

      user.arePasswordsMatching(password, function(err, isMatch) {
        
        if (err) { 
          return callback(err); 
        }

        if (!isMatch) { 
          return callback(null, { err: { passwordErr: 'Invalid password', code: 401 } }); 
        }

        const { token, csrf } = generateToken(user.name, user.email, user._id);

        return callback(null, { token, csrf });
      });
    });
  }
));

export const authenticatedWithBasic = passport.authenticate('basic', { session : false });