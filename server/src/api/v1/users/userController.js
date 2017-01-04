'use strict';

const async = require ('async');

const models = require ('../../../models/index');
const config = require ('../../../config/config');
const log    = require ('../../../libs/winston')(module);

const userModel = models.userModel;

const objectIdRegex = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;

let userController = {};

function formatResponse(pUser) {
  return {
    user: {
      _id: pUser._id,
      fullname: pUser.fullname,
    },
    boards: pUser.boards,
    organizations: pUser.organizations,
    starredBoards: pUser.boardStars
  } 
}

userController.getUser = (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(404).json({
      error : req.err
    });
  } else {
    return res.status(200).json({
      data: formatResponse(user)
    });
	}
};

userController.updateUser = (req, res) => {
  let cbErrorMsg = {};

  const isNameValid = req.body.name !== undefined;
  const isFullNameValid = req.body.fullname !== undefined;
  const isInitialsValid = req.body.initials !== undefined;

  if (!isNameValid) {
    cbErrorMsg.missingNameError = 'Please enter your name'; 
  } 

  if (!isFullNameValid) {
    cbErrorMsg.missingFullNameError = 'Please enter your full name'; 
  } 

  if (!isInitialsValid) {
    cbErrorMsg.missingInitialsError = 'Please enter your initials'; 
  }

  if (!isNameValid || 
      !isFullNameValid || 
      !isInitialsValid) {

    return res.status(400).json({
      data: {
        error: cbErrorMsg
      }
    });
  } else {
    async.waterfall([
      (callback) => {
        req.user.update(
          { name: req.body.name , 
            fullname: req.body.fullname ,
            initials: req.body.initials }, 
          { new: true }, 
          callback
        )
      },
      (user, callback) => {
        if (!user) {
          callback('Sorry. I could not update that user');
        } else {
          callback(null, user);
        }
      }
    ], (error, user) => { 
      if (error) {
        return res.status(404).json({
          data: {
            error
          }
        });
      } 

      return res.status(200).json({
        data: formatResponse(user)
      });
    });
  }
};

userController.removeUser = (req, res) => {

  async.waterfall([
    (callback) => {
      req.user.remove(callback)
    },
    (user, callback) => {

      if (!user) {
        callback('Sorry. I could not remove that user');
      } else {
        callback(null, user);
      }
    }
  ], (error, user) => { 

    if (error) {
      return res.status(404).json({
        data: {
          error
        }
      });
    }

    return res.status(200).json({
      data: formatResponse(user)
    });
  });
};

module.exports = userController;