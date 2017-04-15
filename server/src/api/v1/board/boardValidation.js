import Joi from 'joi';

export const saveUserBoardSchema = {
  body: {
    name: Joi.string().required()
  }
};

export const renameBoardNameSchema = {
  body: {
    name: Joi.string().required()
  }
};

export const removeUserBoardSchema = {
  params: {
    idBoard: Joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)
  }
};

export const saveUserBoardStarSchema = {
  params: {
    idBoard: Joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)
  }
};

export const removeUserBoardStarSchema = {
  params: {
    idBoard: Joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)
  }
};