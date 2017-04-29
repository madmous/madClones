'use strict';

import { userModel } from '../../../models/index';

const buildResponse = (statusCode, data, res) => {
  if (statusCode === 200) {
    return res.status(200).json({
      data: {
        user: {
          _id: data._id,
          fullname: data.fullname,
        }
      }
    });
  } else {
    return res.status(statusCode).json({
      data: data
    });
  }
}

export const getUser = (req, res) => {
  const user = req.user;

  if (!user) {
    buildResponse(401, req.err, res);
  } else {
    buildResponse(200, user, res);
	}
};

export const updateUser = (req, res) => {
  const errorMessage = 'Sorry. I could not update that user';
  const user = req.user;

  user.name = req.body.name; 
  user.fullname = req.body.fullname;
  user.initials = req.body.initials;

  user.save()
    .then(user => buildResponse(200, user, res))
    .catch(error => buildResponse(404, errorMessage, res));
};

export const removeUser = (req, res) => {
  const errorMessage = 'Sorry. I could not remove that user';
  const user = req.user;

  user.remove()
    .then(user => buildResponse(200, user, res))
    .catch(error => buildResponse(404, errorMessage, res));
};