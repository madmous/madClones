import { buildResponse } from './responseService';

export const saveUserService = (user, res) => {
  user.save()
    .then(user => buildResponse(200, user, res))
    .catch(error => buildResponse(404, errorMessage, res));
};

export const removeUserService = (user, res) => {
  user.remove()
    .then(user => buildResponse(200, user, res))
    .catch(error => buildResponse(404, errorMessage, res));
};