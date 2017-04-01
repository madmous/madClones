const Joi = require ('joi');

const userValidation = {};

userValidation.updateUser = {
  name: Joi.string().required(),
  fullname: Joi.string().required(),
  initials: Joi.string().required()
};

module.exports = userValidation