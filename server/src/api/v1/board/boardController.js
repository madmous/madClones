'use strict';

const async = require ('async');

const models = require ('../../../models/index');
const config = require ('../../../config/config');
const log    = require ('../../../libs/winston')(module);

const boardStarModel = models.boardStarModel;
const boardModel     = models.boardModel;

const objectIdRegex = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;

let boardController = {};

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

boardController.saveUserBoard = (req, res) => {
  const errorMessage = [];

  if (req.body.name === undefined) {
    errorMessage.push('Please enter a board name');

    return res.status(400).json({
      data: {
        uiError: errorMessage
      }
    });
  } else {
    async.waterfall([
      (callback) => {
        let user = req.user;

        let board = new boardModel({
          name: req.body.name
        });

        user.boards.push(board);
        user.save(callback);
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
        data: {
          boards: user.boards 
        }
      });
    });
  }
};

boardController.removeUserBoard = (req, res) => {

  if (!objectIdRegex.test(req.params.idBoard)) {
    return res.status(400).json({
      data: {
        error: 'Please enter a valid board id'
      }
    });
  } else {
    async.waterfall([
      (callback) => {
        let user = req.user;
        let board = user.boards.id(req.params.idBoard);

        if (board === null) {
          callback('That board does not exist');
        } else {
          board.remove();
          user.save(callback);
        }
      },
      (user, numRowAffected, callback) => {

        if (!user) {
          callback('Sorry I could not remove that board');
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
          boards: user.boards
        }
      });
    });
  }
};

boardController.saveUserBoardStar = (req, res) => {

  if (!objectIdRegex.test(req.params.idBoard)) {
    return res.status(400).json({
      data: {
        error: 'Please enter a valid board id'
      }
    });
  } else {
    async.waterfall([
      (callback) => {
        let user = req.user;

        let board = user.boards.id(req.params.idBoard);

        if (board === null ) {
          callback('That board does not exist');
        } else {
          board.isStarredBoard = true;

          let boardStar = new boardStarModel({
            id: board.id,
            name: board.name
          });
          
          user.boardStars.push(boardStar);
          user.save(callback);
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
        data: formatResponse(user)
      });
    });
  }
};

boardController.removeUserBoardStar = (req, res) => {

  if (!objectIdRegex.test(req.params.idBoard)) {
    return res.status(400).json({
      data: {
        error: 'Please enter a valid board id'
      }
    });
  } else {
    async.waterfall([
      (callback) => {
        let user = req.user;
        let board = user.boards.id(req.params.idBoard);

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
        data: formatResponse(user)
      });
    });
  }
};

module.exports = boardController;