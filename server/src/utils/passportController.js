const passport      = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const async         = require ('async');

const models    = require ('../models/index');
const userModel = models.userModel;

passport.use(new BasicStrategy(
  function(username, password, callback) {

    userModel.findOne({ name: username }, function (err, user) {

      if (err) { 
				return callback(err); 
			}

      if (!user) { 
				return callback(null, false); 
			}

      user.arePasswordsMatching(password, function(err, isMatch) {
        
        if (err) { 
          return callback(err); 
        }

        if (!isMatch) { 
          return callback(null, false); 
        }

        return callback(null, user);
      });
    });
  }
));

exports.isAuthenticated = passport.authenticate('basic', { session : false });

// TODO : refactor -> use async and do parralel operation with findOne({email: email})

/*async.waterfall([
    (callback) => {
      userModel.findOne({ name: username }, callback);
    },
    (user, callback) => {
      if (!user) {
        callback(null, false); 
      } else {
        callback(user);
      }
    },
    (user, callback) => {
      user.arePasswordsMatching(password, callback);
    }
  ], (err, isMatch) => { 
    if (err) { 
      return callback(err); 
    } else if (!isMatch) { 
      return callback(null, false); 
    } else {
      return callback(null, user);
    } 
  });*/