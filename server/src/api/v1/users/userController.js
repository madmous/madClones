'use strict';

const async = require ('async');

const models = require ('../../../models/index');
const config = require ('../../../config/config');
const log    = require ('../../../libs/winston')(module);

const organizationModel = models.organizationModel;
const boardStarModel    = models.boardStarModel;
const boardModel        = models.boardModel;
const userModel         = models.userModel;

const objectIdRegex = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;

let userController = {};

userController.findAll = (req, res) => {
  async.waterfall([  
    (callback) => {
      userModel.
        find().
        select('name fullname initials email boardStars organizations').
        exec(callback);
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
  if(!objectIdRegex.test(req.params.id)) {
    return res.status(400).json({
      data: {
        error: 'Please enter a valid user id'
      }
    });
  } else {
    async.waterfall([  
      (callback) => {
        userModel.
          findById(req.params.id).
          select('name fullname initials email boardStars organizations').
          exec(callback);
      },
      (user, callback) => {
        if (!user) {
          callback('That user does not exist');
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
  }
};

userController.findOrganizations = (req, res) => {
  if(!objectIdRegex.test(req.params.id)) {
    return res.status(400).json({
      data: {
        error: 'Please enter a valid user id'
      }
    });
  } else {
    async.waterfall([
      (callback) => {
        userModel.findById(req.params.id, callback);
      },
      (user, callback) => {
        if (!user) {
          callback('That user does not exist');
        } else {
          callback(null, user.organizations);
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
          organizations: results
        }
      });
    });
  }
};

userController.findBoardsByOrganization = (req, res) => {
  if(!objectIdRegex.test(req.params.id)) {
    return res.status(400).json({
      data: {
        error: 'Please enter a valid user id'
      }
    });
  } else if (!objectIdRegex.test(req.params.idOrganization)) {
    return res.status(400).json({
      data: {
        error: 'Please enter a valid organization id'
      }
    });
  } else {
    async.waterfall([
      (callback) => {
        userModel.findById(req.params.id, callback);
      },
      (user, callback) => {
        if (!user) {
          callback('That user does not exist');
        } else {
          let organization = user.organizations.id(req.params.idOrganization);

          if (organization === null) {
            callback('That organization does not exist');
          } else {
            callback(null, organization.boards);
          }
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
          boards: results
        }
      });
    });
  }
};

userController.save = (req, res) => {
  async.waterfall([
    (callback) => {
      let cbErrorMsg = {};

      const isNameValid = req.body.name !== undefined;
      const isFullNameValid = req.body.fullname !== undefined;
      const isInitialsValid = req.body.initials !== undefined;
      const isEmailValid = req.body.email !== undefined;
      const isPasswordValid = req.body.password !== undefined;

      if (!isNameValid) {
        cbErrorMsg.missingNameError = 'Please enter your name'; 
      } 

      if (!isFullNameValid) {
        cbErrorMsg.missingFullNameError = 'Please enter your full name'; 
      } 

      if (!isInitialsValid) {
        cbErrorMsg.missingInitialsError = 'Please enter your initials'; 
      } 

      if (!isEmailValid) {
        cbErrorMsg.missingEmailError = 'Please enter your email'; 
      } 

      if (!isPasswordValid) {
        cbErrorMsg.missingPasswordError = 'Please enter your password';
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
        callback('That name is already taken');
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
        const res = {
          message: 'success',
          data: {}
        };

        res.data.id = user._id;

        log.info('User was saved successfully');
        callback(null, res);          
      }
    }
  ], (err, response) => { 
    if (err) {
      return res.status(400).json({
        data: {
          error: err
        }
      });
    } 

    return res.status(200).json({response});
  });
};

userController.saveOrganization = (req, res) => {
  let cbErrorMsg = {};

  const isNameValid = req.body.name !== undefined;
  const isDisplayNameValid = req.body.displayName !== undefined;

  if (!isNameValid) {
    cbErrorMsg.missingNameError = 'Please enter an organization name'; 
  } 

  if (!isDisplayNameValid) {
    cbErrorMsg.missingDisplayNameError = 'Please enter an organization display name';
  }

  if (!isNameValid || !isDisplayNameValid) {
    return res.status(400).json({
      data: {
        error: cbErrorMsg
      }
    });
  }

  if(!objectIdRegex.test(req.params.id)) {
    return res.status(400).json({
      data: {
        error: 'Please enter a valid user id'
      }
    });
  } else {
    async.waterfall([
      (callback) => {
        userModel.findById(req.params.id, callback);
      },
      (user, callback) => {
        if (!user) {
          callback('That user does not exist');
        } else {
          callback(null, user);
        }
      },
      (user, callback) => {
        let organization = new organizationModel({
          name: req.body.name,
          displayName: req.body.displayName
        });

        user.organizations.push(organization);

        user.save(callback);
      },
      (user, numRowAffected, callback) => {
        if (!user) {
          callback('Error while saving organization');
        } else {
          callback(null, 'Success');          
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
          message: results
        }
      });
    });
  }
};

userController.saveBoard = (req, res) => {
  if (req.body.name === undefined) {
    return res.status(400).json({
      data: {
        error: 'Please enter a board name'
      }
    });
  }

  if(!objectIdRegex.test(req.params.id)) {
    return res.status(400).json({
      data: {
        error: 'Please enter a valid user id'
      }
    });
  } else if (!objectIdRegex.test(req.params.idOrganization)) {
    return res.status(400).json({
      data: {
        error: 'Please enter a valid organization id'
      }
    });
  } else {
    async.waterfall([
      (callback) => {
        userModel.findById(req.params.id, callback);
      },
      (user, callback) => {
        if (!user) {
          callback('That user does not exist');
        } else {
          callback(null, user);
        }
      },
      (user, callback) => {
        let board = new boardModel({
          name: req.body.name
        });

        let organization = user.organizations.id(req.params.idOrganization);

        if (organization === null) {
          callback('That organization does not exist');
        } else {
          organization.boards.push(board);
          user.save(callback);
        }
      },
      (user, numRowAffected, callback) => {
        if (!user) {
          callback('Error while saving the board');
        } else {
          callback(null, 'Success');          
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
          message: results
        }
      });
    });
  }
};

userController.saveBoardStar = (req, res) => {

  if(!objectIdRegex.test(req.params.id)) {
    return res.status(400).json({
      data: {
        error: 'Please enter a valid user id'
      }
    });
  } else {
    async.waterfall([
      (callback) => {
        userModel.findById(req.params.id, callback);
      },
      (user, callback) => {
        if (!user) {
          callback('That user does not exist');
        } else {
          callback(null, user);
        }
      },
      (user, callback) => {
        let organization = user.organizations.id(req.params.idOrganization);

        if (organization === null) {
          callback('That organization does not exist');
        } else {

          let board = organization.boards.id(req.params.idBoard);

          if (board === null ) {
            callback('That board does not exist');
          } else {
            let boardStar = new boardStarModel({
              id: board.id
            });
            
            user.boardStars.push(boardStar);
            user.save(callback);
          }
        }
      },
      (user, numRowAffected, callback) => {
        if (!user) {
          callback('Error while saving the board star');
        } else {
          callback(null, 'Success');          
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
          message: results
        }
      });
    });
  }
};

userController.remove = (req, res) => {

  if(objectIdRegex.test(req.params.id)) {
    async.waterfall([  
      (callback) => {
        userModel.findById(req.params.id, callback);
      },
      (user, callback) => {

        if (!user) {
          callback('That user does not exist');
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

userController.removeOrganization = (req, res) => {
  if(!objectIdRegex.test(req.params.id)) {
    return res.status(400).json({
      data: {
        error: 'Please enter a valid user id'
      }
    });
  } else {
    async.waterfall([
      (callback) => {
        userModel.findById(req.params.id, callback);
      },
      (user, callback) => {
        if (!user) {
          callback('User does not exist');
        } else {
          let organization = user.organizations.id(req.params.idOrganization);

          if (organization === undefined) {
            callback('That organization does not exist');
          } else {
            organizations.remove();
            user.save(callback);
          }
        }
      },
      (user, numRowAffected, callback) => {
        if (!user) {
          callback('Sorry I could not remove that organization');
        } else {
          callback(null, 'Success');
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
          message: results
        }
      });
    });
  }
};

userController.removeBoard = (req, res) => {
  if(!objectIdRegex.test(req.params.id)) {
    return res.status(400).json({
      data: {
        error: 'Please enter a valid user id'
      }
    });
  } else {
    async.waterfall([
      (callback) => {
        userModel.findById(req.params.id, callback);
      },
      (user, callback) => {
        if (!user) {
          callback('User does not exist');
        } else {
          let organization = user.organizations.id(req.params.idOrganization);

          if (organization === null) {
            callback('That organization does not exist');
          } else {
            let board = organization.boards.id(req.params.idBoard);

            if (board === null) {
              callback('That board does not exist');
            } else {

                let boardStars = user.boardStars;

                if (boardStars.length !==0) {
                  for (let boardStar of boardStars) {
                    if (boardStar.id == req.params.idBoard) {
                      user.boardStars.id(boardStar._id).remove();
                      board.remove();
                      user.save(callback);
                    }
                  }
                } else {
                  callback('This board is not a board star');
                }
            }
          }
        }
      },
      (user, numRowAffected, callback) => {
        if (!user) {
          callback('Sorry I could not remove that board star');
        } else {
          callback(null, 'Success');
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
          message: results
        }
      });
    });
  }
};

userController.removeBoardStar = (req, res) => {
  if(!objectIdRegex.test(req.params.id)) {
    return res.status(400).json({
      data: {
        error: 'Please enter a valid user id'
      }
    });
  } else {
    async.waterfall([
      (callback) => {
        userModel.findById(req.params.id, callback);
      },
      (user, callback) => {
        if (!user) {
          callback('User does not exist');
        } else {
          let boardStar = user.boardStars.id(req.params.idBoardStar);
              
          if (boardStar === null) {
            callback('That board star does not exist');
          } else {
            boardStar.remove();
            user.save(callback);
          }
        }
      },
      (user, numRowAffected, callback) => {
        if (!user) {
          callback('Sorry I could not remove that boardStar');
        } else {
          callback(null, 'Success');
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
          message: results
        }
      });
    });
  }
};

userController.update = (req, res) => {
  if(objectIdRegex.test(req.params.id)) {
    async.waterfall([  
      (callback) => {
        userModel.findById(req.params.id, callback);
      },
      (user, callback) => {
        if (!user) {
          callback('That user does not exist');
        } else {
          user.update(
            { name: req.body.name , 
              fullname: req.body.fullname ,
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
          callback(null, 'Success');
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

userController.updateOrganization = (req, res) => {
  if(!objectIdRegex.test(req.params.id)) {
    return res.status(400).json({
      data: {
        error: 'Please enter a valid user id'
      }
    });
  } else {
    async.waterfall([
      (callback) => {
        userModel.findById(req.params.id, callback);
      },
      (user, callback) => {
        if (!user) {
          callback('User does not exist');
        } else {
          let organization = user.organizations.id(req.params.idOrganization);

          if (organization === undefined) {
            callback('That organization does not exist');
          } else {
            organization.name = req.body.name;
            organization.displayName = req.body.displayName;

            user.save(callback);
          }
        }
      },
      (user, numRowAffected, callback) => {
        if (!user) {
          callback('Sorry I could not update that organization');
        } else {
          callback(null, 'Success');
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
          message: results
        }
      });
    });
  }
};

userController.updateBoard = (req, res) => {
  if(!objectIdRegex.test(req.params.id)) {
    return res.status(400).json({
      data: {
        error: 'Please enter a valid user id'
      }
    });
  } else {
    async.waterfall([
      (callback) => {
        userModel.findById(req.params.id, callback);
      },
      (user, callback) => {
        if (!user) {
          callback('User does not exist');
        } else {
          let organization = user.organizations.id(req.params.idOrganization);

          if (organization === undefined) {
            callback('That organization does not exist');
          } else {
            let board = organization.boards.id(req.params.idBoard);

            if (board === undefined) {
              callback('That board does not exist');
            } else {
              board.name = req.body.name;
              user.save(callback);
            }
          }
        }
      },
      (user, numRowAffected, callback) => {
        if (!user) {
          callback('Sorry I could not update that board');
        } else {
          callback(null, 'Success');
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
          message: results
        }
      });
    });
  }
};

module.exports = userController;