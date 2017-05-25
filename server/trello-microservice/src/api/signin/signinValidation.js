import Joi from 'joi';

export const getUserSchema = {
  body: {
    name: Joi.string().required(),
    email: Joi.string().email().required()
  }
};