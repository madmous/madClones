'use strict';

import { userModel } from '../../models/index';

import { saveUserService } from '../../utils/userService';

export const saveUser = (req, res) => {
  let user = new userModel({
    name: req.body.name,
    fullname: req.body.fullname,
    email: req.body.email
  });

  saveUserService(user, res);
};