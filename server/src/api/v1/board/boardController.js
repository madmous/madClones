'use strict';

import {
  boardStarModel,
  boardModel
} from '../../../models/index';

const objectIdRegex = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;

const formatResponse = user => {
  return {
    boards: user.boards,
    organizations: user.organizations,
    starredBoards: user.boardStars
  }
};

const buildResponse = (statusCode, data, res) => {
  if (statusCode === 200) {
    return res.status(200).json({
      data: formatResponse(data)
    })
  } else {
    return res.status(statusCode).json({
      error: data
    })
  }
};

export const saveUserBoard = (req, res) => {
  if (!req.body.name) {
    buildResponse(400, 'Please enter a board name', res);
  } else {
    let user = req.user;

    let board = new boardModel({
      name: req.body.name
    });

    user.boards.push(board);

    user.save()
      .then(user => buildResponse(200, user, res))
      .catch(error => buildResponse(500, error, res));
  }
};

export const removeUserBoard = (req, res) => {
  if (!objectIdRegex.test(req.params.idBoard)) {
    buildResponse(400, 'Please enter a valid board id', res);
  } else {
    let user = req.user;
    let board = user.boards.id(req.params.idBoard);

    if (!board) {
      buildResponse(404, 'That board does not exist', res);
    } else {
      board.remove();

      user.save()
      .then(user => buildResponse(200, user, res))
      .catch(error => buildResponse(500, error, res));
    }
  }
};

export const saveUserBoardStar = (req, res) => {
  if (!objectIdRegex.test(req.params.idBoard)) {
    buildResponse(400, 'Please enter a valid board id', res);
  } else {
    let user = req.user;
    let board = user.boards.id(req.params.idBoard);

    if (!board) {
      buildResponse(404, 'That board does not exist', res);
    } else {
      board.isStarredBoard = true;

      let boardStar = new boardStarModel({
        id: board.id,
        name: board.name
      });
      
      user.boardStars.push(boardStar);

      user.save()
        .then(user => buildResponse(200, user, res))
        .catch(error => buildResponse(500, error, res));
    }
  }
};

// TODO: use lodash
const starredBoardIndex = (starredBoards, boardId) => {
  let starredBoardIndex = null;

  starredBoards.forEach((starredBoard, index) => {
    if (starredBoard.id.equals(boardId)) {
      starredBoardIndex = index;
      return false;
    }
  })

  return starredBoardIndex;
};

export const removeUserBoardStar = (req, res) => {
  if (!objectIdRegex.test(req.params.idBoard)) {
    buildResponse(400, 'Please enter a valid board id', res);
  } else {
    let user = req.user;
    let board = user.boards.id(req.params.idBoard);

    if (!board) {
      buildResponse(404, 'That board does not exist', res);
    } else {
      if (!board.isStarredBoard) {
        buildResponse(400, 'This board is not starred', res);
      } else {
        const index = starredBoardIndex(user.boardStars, board._id);

        if (index === null) {
          buildResponse(400, 'This board is not starred', res);
        } else {
          board.isStarredBoard = false;

          user.boardStars[index].remove();

          user.save()
            .then(user => buildResponse(200, user, res))
            .catch(error => buildResponse(500, error, res));
        }
      }
    }
  }
};