import Joi from 'joi';

export const getUserBoardCardsSchema = {
  params: {
    idBoard: Joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)
  }
};

export const updateUserBoardCardsSchema = {
  body: {
    cards: Joi.array().required()
  },
  params: {
    idBoard: Joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)
  }
};

export const saveUserBoardCardSchema = {
  body: {
    name: Joi.string().required()
  },
  params: {
    idBoard: Joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)
  }
};

export const saveUserBoardCardItemSchema = {
  body: {
    name: Joi.string().required()
  },
  params: {
    idBoard: Joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i),
    idCard: Joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)
  }
};