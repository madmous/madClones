'use strict';

const async = require ('async');

const models = require ('../../../models/index');
const config = require ('../../../config/config');
const log    = require ('../../../libs/winston')(module);
const jwt    = require('jwt-simple');

const secret = require('../../../config/config').secret;

const userModel = models.userModel;

let signUpController = {};

signUpController.saveUser = (req, res) => {
  async.waterfall([
    (callback) => {
      let cbErrorMsg = {};

      const isNameValid = req.body.name !== undefined;
      const isFullNameValid = req.body.fullname !== undefined;
      const isInitialsValid = req.body.initials !== undefined;
      const isEmailValid = req.body.email !== undefined;
      const isPasswordValid = req.body.password !== undefined;

      if (!isNameValid) {
        cbErrorMsg.usernameErr = 'Please enter your name'; 
      } 

      if (!isFullNameValid) {
        cbErrorMsg.fullnameErr = 'Please enter your full name'; 
      } 

      if (!isInitialsValid) {
        cbErrorMsg.initialsErr = 'Please enter your initials'; 
      } 

      if (!isEmailValid) {
        cbErrorMsg.emailErr = 'Please enter your email'; 
      } 

      if (!isPasswordValid) {
        cbErrorMsg.passwordErr = 'Please enter your password';
      } 

      if (!isNameValid || 
          !isFullNameValid || 
          !isInitialsValid || 
          !isEmailValid || 
          !isPasswordValid) {
        callback(cbErrorMsg);
      } else {
        callback();
      }
    },
    (callback) => {
      userModel.findOne({name: req.body.name}, callback);
    },
    (user, callback) => {
      if (user) {
        callback({ usernameErr: 'That name is already taken' });
      } else {
        const user = new userModel({
          name: req.body.name,
          fullname: req.body.fullname,
          password: req.body.password,
          initials: req.body.initials,
          email: req.body.email
        });

        user.save(callback);
      }
    },
    (user, numAffected, callback) => {
      if (!user) {
        const msg = 'User was not saved successfully';
        
        log.info(msg);
        callback(msg);
      } else {

        log.info('User was saved successfully');
        callback(null, user);          
      }
    }
  ], (error, user) => { 
    if (error) {
      return res.status(404).json({
        data: {
          uiError : error
        }
      });
    } 

    const token = jwt.encode(user._id, secret);

    return res.status(200).json({
      data: {
				token: token
			}
    });
  });
};

module.exports = signUpController;