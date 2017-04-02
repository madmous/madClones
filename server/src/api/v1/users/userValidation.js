import Joi from 'joi';

export const updateUserSchema = {
  name: Joi.string().required(),
  fullname: Joi.string().required(),
  initials: Joi.string().required()
};