'use strict';

const async     = require ('async');

const userModel = require ('./usersModel');
const config    = require ('../../config/config');
    
const tokenNotFound = 'Sorry. I do not recognize that token';
const idNotFound    = 'Sorry. I do not recognize that id';

const objectIdRegex = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;

const userController = {};

userController.findAll = (req, res) => {
  async.waterfall([  
    (callback) => {
      userModel.find(callback);
    },
    (user, callback) =>{
      if (!user) {
        callback({error: 'Error getting users'});
      } else {
        callback(null, user);
      }
    }
  ], (err, results) => { 
    if (err) {
      return res.status(500).json({
        data: {
          error: err
        }
      });
    } 

    return res.status(200).json({
      data: {
        users: results
      }
    });
  });
};

userController.findById = (req, res) => {
  if(objectIdRegex.test(req.params.id)) {
    async.waterfall([  
      (callback) => {
        userModel.findById(req.params.id, callback);
      },
      (user, callback) => {
        if (!user) {
          callback(tokenNotFound);
        } else {
          userModel.findById(req.params.id, callback);
        }
      },
      (user, callback) => {
        if (!user) {
          callback(idNotFound);
        } else {
          callback(null, user);          
        }
      }
    ], (err, results) => { 
      if (err) {
        return res.status(404).json({
          data: {
            error: err
          }
        });
      } else {
        return res.status(200).json({
          data: {
            users: results
          }
        });
      }
    });
  } else {
    return res.status(400).json({
      data: {
        error: 'Please enter a valid user id'
      }
    });
  } 
};

userController.save = (req, res) => {
  async.waterfall([
    (callback) => {
      const isNameValid = req.body.userName !== undefined;
      const isFullNameValid = req.body.fullName !== undefined;
      const isInitialsValid = req.body.initials !== undefined;
      const isEmailValid = req.body.email !== undefined;
      const isPasswordValid = req.body.password !== undefined;

      let cbErrorMsg = {};

      if (!isNameValid) {
        cbErrorMsg.missingUserNameError = 'Please enter your userName'; 
      } 

      if (!isFullNameValid) {
        cbErrorMsg.missingFullNameError = 'Please enter your fullName'; 
      } 

      if (!isInitialsValid) {
        cbErrorMsg.missingInitialsError = 'Please enter your initials'; 
      } 

      if (!isEmailValid) {
        cbErrorMsg.missingEmailError = 'Please enter your email'; 
      } 

      if (!isNameValid) {
        cbErrorMsg.missingPasswordError = 'Please enter your password';
      } 

      if (isNameValid || 
          isFullNameValid || 
          isInitialsValid || 
          isEmailValid || 
          isPasswordValid) {
        callback(cbErrorMsg);
      } else {
        callback();
      }
    },
    (callback) => {
      userModel.findOne({name: req.body.email}, callback);
    },
    (user, callback) => {
      if (user) {
        callback('That username is already taken');
      } else {
        let user = new userModel({
          userName: req.body.userName,
          fullName: req.body.fullName,
          password: req.body.password,
          initials: req.body.initials,
          email: req.body.email
        });
        callback(null, user);
      }
    },
    (user, callback) => {
      user.save(callback);
    },
    (user, numAffected, callback) => {
      if (!user) {
        callback(idNotFound);
      } else {
        callback(null, user.id);          
      }
    }
  ], (err, results) => { 
    if (err) {
      return res.status(400).json({
        data: {
          error: err
        }
      });
    } 

    return res.status(200).json({
      data: {
        id: results
      }
    });
  });
};

userController.remove = (req, res) => {
  if(objectIdRegex.test(req.params.id)) {
    async.waterfall([  
      (callback) => {
        userModel.findById(req.params.id, callback);
      },
      (user, callback) => {
        if (!user) {
          callback(idNotFound);
        } else {
          user.remove(callback)
        }
      },
      (user, callback) => {
        if (!user) {
          callback('Sorry. I could not remove that user');
        } else {
          callback(null, 'success');
        }
      }
    ], (err, results) => { 
      if (err) {
        return res.status(404).json({
          data: {
            error: err
          }
        });
      }

      return res.status(200).json({
        data: {
          message: results
        }
      });
    });
  } else {
    return res.status(404).json({
      data: {
        error: 'Please enter a valid user id'
      }
    });
  }
}

userController.update = (req, res) => {
  if(objectIdRegex.test(req.params.id)) {
    async.waterfall([  
      (callback) => {
        userModel.findById(req.params.id, callback);
      },
      (user, callback) => {
        if (!user) {
          callback(idNotFound);
        } else {
          user.update(
            { userName: req.body.userName , 
              fullName: req.body.fullName ,
              initials: req.body.initials }, 
            { new: true }, 
            callback
          )
        }
      },
      (user, callback) => {
        if (!user) {
          callback('Sorry. I could not update that user');
        } else {
          callback(null, 'success');
        }
      }
    ], (err, results) => { 
      if (err) {
        return res.status(404).json({
          data: {
            error: err
          }
        });
      } 

      return res.status(200).json({
        data: {
          info: results
        }
      });
    });
  } else {
    return res.status(400).json({
      data: {
        error: 'Please enter a valid user id'
      }
    });
  } 
}

module.exports = userController;