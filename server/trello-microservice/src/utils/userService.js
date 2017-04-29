import { buildResponse } from './responseService';

export const saveUserService = async (user, res) => {
  try {
    let savedUser = await user.save();

    if (savedUser) {
      buildResponse(200, user, res)
    }
  } catch (error) {
    buildResponse(404, error, res);
  }
};

export const removeUserService = async (user, res) => {
  try {
    let removedUser = await user.remove();

    if (removedUser) {
      buildResponse(200, user, res)
    }
  } catch (error) {
    buildResponse(404, error, res);
  }
};