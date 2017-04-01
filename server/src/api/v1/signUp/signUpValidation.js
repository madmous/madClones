const Joi = require ('joi');

const signupValidation = {};

signupValidation.saveUser = {
  body: {
    name: Joi.string().required(),
    fullname: Joi.string().required(),
    initials: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }
};

module.exports = signupValidation;