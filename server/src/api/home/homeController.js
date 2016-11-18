'use strict';

const async     = require ('async');

const organizationModel = require ('../organizations/organizationModel');
const boardModel        = require ('../boards/boardModel');
const userModel         = require ('../users/usersModel');

const homeController = {};

homeController.get = (req, res) => {

  let response = {};

  async.waterfall([  
    (callback) => {
      userModel.findById('5828a8f6b2f3172cd1a20e04', callback);
    },
    (user, callback) =>{
      if (!user) {
        callback({error: 'Error getting user'});
      } else {
        response.user = user;

        callback(null, response);
      }
    },
    (response, callback) => {
      boardModel.find({idUser : response.user.id}, callback);
    },
    (boards, callback) =>{
      if (!boards) {
        callback({error: 'Error getting board'});
      } else {
        response.boards = boards;

        callback(null, response);
      }
    },
    (response, callback) => {
      organizationModel.find({}, callback);
    },
    (organizations, callback) =>{
      if (!organizations) {
        callback({error: 'Error getting organizations'});
      } else {
        response.organizations = organizations;

        callback(null, response);
      }
    },
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
        user: results.user,
        boards: results.boards,
        organizations: results.organizations
      }
    });
  });
};

module.exports = homeController;