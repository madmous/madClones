'use strict';

import {
  boardStarModel,
  boardModel
} from '../../models/index';

import { saveUserService } from '../../utils/userService';
import { buildResponse } from '../../utils/responseService';

const objectIdRegex = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;

export const saveUserBoard = (req, res) => {
  if (!req.body.name) {
    buildResponse(400, 'Please enter a board name', res);
  } else {
    let user = req.user;

    let board = new boardModel({
      name: req.body.name
    });

    user.boards.push(board);
    saveUserService(user, res);
  }
};

export const removeUserBoard = (req, res) => {
  let user = req.user;
  let board = user.boards.id(req.params.idBoard);

  if (!board) {
    buildResponse(404, 'That board does not exist', res);
  } else {
    board.remove();
    saveUserService(user, res);
  }
};

export const renameBoardName = (req, res) => {
  let user = req.user;
  let board = user.boards.id(req.params.idBoard);

  if (!board) {
    buildResponse(404, 'That board does not exist', res);
  } else {
    board.name = req.body.name;
    
    saveUserService(user, res);
  }
};

export const saveUserBoardStar = (req, res) => {
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
    saveUserService(user, res);
  }
};

export const removeUserBoardStar = (req, res) => {
  let user = req.user;
  let board = user.boards.id(req.params.idBoard);

  if (!board) {
    buildResponse(404, 'That board does not exist', res);
  } else {
    if (!board.isStarredBoard) {
      buildResponse(400, 'This board is not starred', res);
    } else {
      const index = user.boardStars.findIndex(starredBoard => starredBoard.id.equals(board._id));

      if (index === -1) {
        buildResponse(400, 'This board is not starred', res);
      } else {
        board.isStarredBoard = false;

        user.boardStars[index].remove();
        saveUserService(user, res);
      }
    }
  }
};