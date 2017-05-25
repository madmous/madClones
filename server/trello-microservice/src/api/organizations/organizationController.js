'use strict';

import async from 'async';

import {
  organizationModel,
  boardStarModel,
  boardModel
} from '../../models/index';

import { saveUserService } from '../../utils/userService';
import { buildResponse } from '../../utils/responseService';

const objectIdRegex = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;

export const saveOrganization = (req, res) => {
  let user = req.user;

  let organization = new organizationModel({
    name: req.body.name,
    displayName: req.body.displayName
  });

  user.organizations.push(organization);

  saveUserService(user, res);
};

export const updateOrganization = (req, res) => {
  let user = req.user;
  let organization = user.organizations.id(req.params.idOrganization);

  if (!organization) {
    buildResponse(404, 'That organization does not exist', res);
  } else {
    organization.name = req.body.name;
    organization.displayName = req.body.displayName;

    saveUserService(user, res);
  }
};

export const removeOrganization = (req, res) => {
 let user = req.user;
  let organization = user.organizations.id(req.params.idOrganization);

  if (!organization) {
    buildResponse(404, 'That organization does not exist', res);
  } else {
    organization.remove();

    saveUserService(user, res);
  }
};

export const saveOrganizationBoard = (req, res) => {
  let user = req.user;

  let board = new boardModel({
    name: req.body.name
  });

  let organization = user.organizations.id(req.params.idOrganization);

  if (!organization) {
    buildResponse(404, 'That organization does not exist', res);
  } else {
    organization.boards.push(board);

    saveUserService(user, res);
  }
};

export const updateOrganizationBoard = (req, res) => {
  let user = req.user;
  let organization = user.organizations.id(req.params.idOrganization);

  if (!organization) {
    buildResponse(404, 'That organization does not exist', res);
  } else {
    let board = organization.boards.id(req.params.idBoard);

    if (!board) {
      buildResponse(404, 'That board does not exist', res);
    } else {
      board.name = req.body.name;

      saveUserService(user, res);
    }
  }
};

export const removeOrganizationBoard = (req, res) => {
  let user = req.user;
  let organization = user.organizations.id(req.params.idOrganization);

  if (!organization) {
    buildResponse(404, 'That organization does not exist', res);
  } else {
    let board = organization.boards.id(req.params.idBoard);

    if (!board) {
      buildResponse(404, 'That board does not exist', res);
    } else {
      board.remove();

      saveUserService(user, res);
    }
  }
};

export const saveOrganizationBoardStar = (req, res) => {
  let user = req.user;
  let organization = user.organizations.id(req.params.idOrganization);

  if (!organization) {
    buildResponse(404, 'That organization does not exist', res);
  } else {
    let board = organization.boards.id(req.params.idBoard);

    if (!board) {
      buildResponse(404, 'That board does not exist', res);
    } else {
      board.isStarredBoard = true;

      let boardStar = new boardStarModel({
        id: board.id,
        name: board.name,
        organizationName: organization.name,
        organizationId: organization.id
      });

      user.boardStars.push(boardStar);

      saveUserService(user, res);
    }
  }
};

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

export const removeOrganizationBoardStar = (req, res) => {
  let user = req.user;
  let organization = user.organizations.id(req.params.idOrganization);

  if (!organization) {
    buildResponse(404, 'That organization does not exist', res);
  } else {
    let board = organization.boards.id(req.params.idBoard);

    if (!board) {
      buildResponse(404, 'That board does not exist', res);
    } else {
      if (!board.isStarredBoard) {
        buildResponse(40, 'This board is not starred', res);
      } else {
        const index = starredBoardIndex(user.boardStars, board._id);

        if (index !== null) {
          board.isStarredBoard = false;

          user.boardStars[index].remove();
        }

        saveUserService(user, res);
      }
    }
  }
};