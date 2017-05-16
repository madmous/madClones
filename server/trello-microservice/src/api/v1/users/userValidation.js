import Joi from 'joi';

export const updateUserSchema = {
  body: {
    name: Joi.string().required(),
    fullname: Joi.string().required(),
    email: Joi.string().email()
  }
};