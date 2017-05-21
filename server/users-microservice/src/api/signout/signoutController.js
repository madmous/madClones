'use strict';

import { userModel } from '../../models/index';

import { saveUserService } from '../../utils/userService';

export const signoutUser = async (req, res) => {
  res.clearCookie('jwt');

  return res.status(200).json({
    data: {
      csrf: ''
    }
  });
};