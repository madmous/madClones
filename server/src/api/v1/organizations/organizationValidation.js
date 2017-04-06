import Joi from 'joi';

const mongooseIdRegex = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;

export const saveOrganizationSchema = {
  body: {
    name: Joi.string().required(),
    displayName: Joi.string().required()
  }
};

export const updateOrganizationSchema = {
  body: {
    name: Joi.string().required(),
    displayName: Joi.string().required()
  },
  params: {
    idOrganization: Joi.string().regex(mongooseIdRegex)
  }
};

export const removeOrganizationSchema = {
  params: {
    idOrganization: Joi.string().regex(mongooseIdRegex)
  }
};

export const saveOrganizationBoardSchema = {
  body: {
    name: Joi.string().required()
  },
  params: {
    idOrganization: Joi.string().regex(mongooseIdRegex)
  }
};

export const updateOrganizationBoardSchema = {
  body: {
    name: Joi.string().required()
  },
  params: {
    idOrganization: Joi.string().regex(mongooseIdRegex)
  }
};

export const removeOrganizationBoardSchema = {
  params: {
    idOrganization: Joi.string().regex(mongooseIdRegex),
    idBoard: Joi.string().regex(mongooseIdRegex)
  }
};

export const saveOrganizationBoardStarSchema = {
  params: {
    idOrganization: Joi.string().regex(mongooseIdRegex),
    idBoard: Joi.string().regex(mongooseIdRegex)
  }
};

export const removeOrganizationBoardStarSchema = {
  params: {
    idOrganization: Joi.string().regex(mongooseIdRegex),
    idBoard: Joi.string().regex(mongooseIdRegex)
  }
};