'use strict';

import validate from 'express-validation';
import express from 'express';

import { updateUserSchema } from './userValidation';

import {
  updateUser,
  removeUser,
  saveUser,
  getUser
} from './userController';

const router = express.Router();

router.route('/')
  .get(getUser)
  .put(validate(updateUserSchema), updateUser)
  .delete(removeUser)

export default router;