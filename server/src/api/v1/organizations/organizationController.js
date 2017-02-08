'use strict';

const async = require ('async');

const models = require ('../../../models/index');
const config = require ('../../../config/config');
const log    = require ('../../../libs/winston')(module);

const organizationModel = models.organizationModel;
const boardStarModel    = models.boardStarModel;
const boardModel        = models.boardModel;

const objectIdRegex = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;

let organizationController = {};

function formatResponse(pUser) {
  return {
    organizations: pUser.organizations
  } 
}

function formatResponse(pUser) {
  return {
    boards: pUser.boards,
    organizations: pUser.organizations,
    starredBoards: pUser.boardStars
  }
}

function starredBoardIndex(starredBoards, boardId) {
  let starredBoardIndex = null;

  starredBoards.forEach((starredBoard, index) => {
    if (starredBoard.id.equals(boardId)) {
      starredBoardIndex = index;
      return false;
    }
  })

  return starredBoardIndex;
}

organizationController.saveOrganization = (req, res) => {
  let cbErrorMsg = {};

  const isNameValid = req.body.name !== undefined;
  const isDisplayNameValid = req.body.displayName !== undefined;

  if (!isNameValid) {
    cbErrorMsg.missingName = 'Please enter an organization name'; 
  } 

  if (!isDisplayNameValid) {
    cbErrorMsg.missingDisplayName = 'Please enter an organization display name';
  }

  if (!isNameValid || !isDisplayNameValid) {
    return res.status(400).json({
      data: {
        uiError: cbErrorMsg
      }
    });
  } else {
    async.waterfall([
      (callback) => {
        let user = req.user;

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
          callback(null, user);          
        }
      }
    ], (error, user) => {
      if (error) {
        return res.status(400).json({
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

organizationController.updateOrganization = (req, res) => {
  let cbErrorMsg = {};

  const isNameValid = req.body.name !== undefined;
  const isDisplayNameValid = req.body.displayName !== undefined;

  if (!isNameValid) {
    cbErrorMsg.missingName = 'Please enter an organization name'; 
  } 

  if (!isDisplayNameValid) {
    cbErrorMsg.missingDisplayName = 'Please enter an organization display name'; 
  }

  if (!isNameValid || 
      !isDisplayNameValid) {

    return res.status(400).json({
      data: {
        uiError: cbErrorMsg
      }
    });
  } else if (!objectIdRegex.test(req.params.idOrganization)) { 
    return res.status(400).json({
      data: {
        error: 'Please enter a valid org id'
      }
    });
  } else {
    async.waterfall([
      (callback) => {
        let user = req.user;
        let organization = user.organizations.id(req.params.idOrganization);

        if (!organization) {
          callback('That organization does not exist');
        } else {
          organization.name = req.body.name;
          organization.displayName = req.body.displayName;

          user.save(callback);
        }
      },
      (user, numRowAffected, callback) => {
        if (!user) {
          callback('Sorry I could not update that organization');
        } else {
          callback(null, user);
        }
      }
    ], (error, user) => { 
      if (error) {
        return res.status(400).json({
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

organizationController.removeOrganization = (req, res) => {
 if (!objectIdRegex.test(req.params.idOrganization)) {
    return res.status(400).json({
      data: {
        error: 'Please enter a valid organization id'
      }
    });
  } else {
    async.waterfall([
      (callback) => {
        let user = req.user;
        let organization = user.organizations.id(req.params.idOrganization);

        if (!organization) {
          callback('That organization does not exist');
        } else {
          organization.remove();
          user.save(callback);
        }
      },
      (user, numRowAffected, callback) => {
        if (!user) {
          callback('Sorry I could not remove that organization');
        } else {
          callback(null, user);
        }
      }
    ], (error, user) => { 
      if (error) {
        return res.status(400).json({
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

organizationController.saveOrganizationBoard = (req, res) => {
  const errorMessage = [];

  if (req.body.name === undefined) {
    errorMessage.push('Please enter a board name');

    return res.status(400).json({
      data: {
        uiError: errorMessage
      }
    });
  }

  if (!objectIdRegex.test(req.params.idOrganization)) {
    return res.status(400).json({
      data: {
        error: 'Please enter a valid organization id'
      }
    });
  } else {
    async.waterfall([
      (callback) => {
        let user = req.user;

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
          callback(null, user);    
        }
      }
    ], (error, user) => { 
      
      if (error) {
        return res.status(400).json({
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

organizationController.updateOrganizationBoard = (req, res) => {
  if (req.body.name === undefined) {

    return res.status(400).json({
      data: {
        error: 'Please enter the board name'
      }
    });
  } else if(!objectIdRegex.test(req.params.idOrganization)) {
    return res.status(400).json({
      data: {
        error: 'Please enter a valid org id'
      }
    });
  } else if(!objectIdRegex.test(req.params.idBoard)) {
    return res.status(400).json({
      data: {
        error: 'Please enter a valid board id'
      }
    });
  } else {
    async.waterfall([
      (callback) => {
        let user = req.user;
        let organization = user.organizations.id(req.params.idOrganization);

        if (!organization) {
          callback('That organization does not exist');
        } else {
          let board = organization.boards.id(req.params.idBoard);

          if (!board) {
            callback('That board does not exist');
          } else {
            board.name = req.body.name;
            user.save(callback);
          }
        }
      },
      (user, numRowAffected, callback) => {
        if (!user) {
          callback('Sorry I could not update that board');
        } else {
          callback(null, user);
        }
      }
    ], (error, user) => { 
      if (error) {
        return res.status(400).json({
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

organizationController.removeOrganizationBoard = (req, res) => {

  async.waterfall([
    (callback) => {
      let user = req.user;
      let organization = user.organizations.id(req.params.idOrganization);

      if (organization === null) {
        callback('That organization does not exist');
      } else {
        let board = organization.boards.id(req.params.idBoard);

        if (board === null) {
          callback('That board does not exist');
        } else {
          board.remove();
          user.save(callback);
        }
      }
    },
    (user, numRowAffected, callback) => {
      if (!user) {
        callback('Sorry I could not remove that board star');
      } else {
        callback(null, user);
      }
    }
  ], (error, user) => { 
    if (error) {
      return res.status(400).json({
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

organizationController.saveOrganizationBoardStar = (req, res) => {

  if (!objectIdRegex.test(req.params.idOrganization)) {
    return res.status(400).json({
      data: {
        error: 'Please enter a valid organization id'
      }
    });
  } else if (!objectIdRegex.test(req.params.idBoard)) {
    return res.status(400).json({
      data: {
        error: 'Please enter a valid board id'
      }
    });
  } else {
    async.waterfall([
      (callback) => {
        let user = req.user;

        let organization = user.organizations.id(req.params.idOrganization);

        if (organization === null) {
          callback('That organization does not exist');
        } else {
          let board = organization.boards.id(req.params.idBoard);

          if (board === null ) {
            callback('That board does not exist');
          } else {
            board.isStarredBoard = true;

            let boardStar = new boardStarModel({
              id: board.id,
              name: board.name,
              organizationName: organization.name,
              organizationId: organization.id
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
          callback(null, user);             
        }
      }
    ], (error, user) => { 
      if (error) {
        return res.status(400).json({
          data: {
            error
          }
        });
      } 

      return res.status(200).json({
        data: {
          boards: user.boards,
          organizations: user.organizations,
          starredBoards: user.boardStars
        } 
      });
    });
  }
};

organizationController.removeOrganizationBoardStar = (req, res) => {

  if (!objectIdRegex.test(req.params.idOrganization)) {
    return res.status(400).json({
      data: {
        error: 'Please enter a valid organization id'
      }
    });
  } else if (!objectIdRegex.test(req.params.idBoard)) {
    return res.status(400).json({
      data: {
        error: 'Please enter a valid board id'
      }
    });
  } else {
    async.waterfall([
      (callback) => {
        let user = req.user;
        let organization = user.organizations.id(req.params.idOrganization);

        if (organization === null) {
          callback('That organization does not exist');
        } else {
          let board = organization.boards.id(req.params.idBoard);

          if (!board) {
            callback('That board does not exist');
          } else {

            if (board.isStarredBoard) {
              const index = starredBoardIndex(user.boardStars, board._id);

              if (index !== null) {
                board.isStarredBoard = false;

                user.boardStars[index].remove();
              }

              user.save(callback);
            } else {
              callback('This board is not starred');
            }
          }
        }
      },
      (user, numRowAffected, callback) => {
        if (!user) {
          callback('Error while saving the board star');
        } else {
          callback(null, user);             
        }
      }
    ], (error, user) => { 
      if (error) {
        return res.status(400).json({
          data: {
            error
          }
        });
      } 

      return res.status(200).json({
        data: {
          boards: user.boards,
          organizations: user.organizations,
          starredBoards: user.boardStars
        } 
      });
    });
  }
};

module.exports = organizationController;