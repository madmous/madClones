'use strict';

const async     = require ('async');

const organizationModel = require ('../organizations/organizationModel');
const boardModel        = require ('./boardModel');
const userModel         = require ('../users/usersModel');
    
const tokenNotFound = 'Sorry. I do not recognize that token';
const idNotFound    = 'Sorry. I do not recognize that id';

const objectIdRegex = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;

const boardController = {};

boardController.findAll = (req, res) => {
  async.waterfall([  
    (callback) => {
      boardModel.find(callback);
    },
    (board, callback) =>{
      if (!board) {
        callback({error: 'Error getting boards'});
      } else {
        callback(null, board);
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
        boards: results
      }
    });
  });
};

boardController.findById = (req, res) => {
  if(objectIdRegex.test(req.params.id)) {
    async.waterfall([  
      (callback) => {
        boardModel.findById(req.params.id, callback);
      },
      (board, callback) => {
        if (!board) {
          callback(tokenNotFound);
        } else {
          boardModel.findById(req.params.id, callback);
        }
      },
      (board, callback) => {
        if (!board) {
          callback(idNotFound);
        } else {
          callback(null, board);          
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
          board: results
        }
      });
    });
  } else {
    return res.status(400).json({
      data: {
        error: 'Please enter a valid board id'
      }
    });
  }
};

boardController.save = (req, res) => {
  const isIdOrganizationValid = req.body.idOrganization !== undefined && objectIdRegex.test(req.body.idOrganization);
  const isIdUSerValid         = req.body.idUser !== undefined && objectIdRegex.test(req.body.idUser);
  const isNameValid           = req.body.name !== undefined;

  let cbErrorMsg = {};

  if (!isIdUSerValid) {
    cbErrorMsg.invalidIdUserError = 'Please enter a valid user id'; 
  } 

  if (!isIdOrganizationValid) {
    cbErrorMsg.invalidIdOrganizationError = 'Please enter a valid organization id'; 
  }

  if (!isNameValid) {
    cbErrorMsg.invalidNameError = 'Please enter a valid name'; 
  }

  if (!(isIdUSerValid || isIdOrganizationValid || isNameValid)) {

    return res.status(200).json({
      data: {
        message: cbErrorMsg
      }
    });
  }

  async.waterfall([
    (callback) => {
      userModel.findById(req.body.idUser, callback);
    },
    (id, callback) => {
      if (!id) {
        callback('This user id does not exist');
      } else {
        organizationModel.findById(req.body.idOrganization, callback);
      }
    },
    (organization, callback) => {
      if (!organization) {
        callback('This organization id does not exist');
      } else {
        let board = new boardModel({
          idUser: req.body.idUser,
          idOrganization: req.body.idOrganization,
          name: req.body.name,
          isClosed: req.body.isClosed === undefined ? false : true,
          createdAt: Date.now()
        });

        organization.boards.push(board);

        organization.save(function (err) {
          if (err) {
            callback(idNotFound);
          } else {
            callback(null, board);
          }
        })
      }
    },
    (board, callback) => {
      board.save(callback);
    },
    (board, numAffected, callback) => {
      if (!board) {
        callback(idNotFound);
      } else {
        callback(null, board.id);          
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

boardController.remove = (req, res) => {
  if(objectIdRegex.test(req.params.id)) {
    async.waterfall([  
      (callback) => {
        boardModel.findById(req.params.id, callback);
      },
      (board, callback) => {
        if (!board) {
          callback(idNotFound);
        } else {
          board.remove(callback)
        }
      },
      (board, callback) => {
        if (!board) {
          callback('Sorry. I could not remove that board');
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
        error: 'Please enter a valid board id'
      }
    });
  }
}

boardController.update = (req, res) => {
  if(objectIdRegex.test(req.params.id)) {
    async.waterfall([  
      (callback) => {
        boardModel.findById(req.params.id, callback);
      },
      (board, callback) => {
        if (!board) {
          callback(idNotFound);
        } else {
          board.update(
            { name: req.body.name },
            { new: true }, 
            callback)
        }
      },
      (board, callback) => {
        if (!board) {
          callback('Sorry. I could not update that board');
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
        error: 'Please enter a valid board id'
      }
    });  
  }
}

module.exports = boardController;