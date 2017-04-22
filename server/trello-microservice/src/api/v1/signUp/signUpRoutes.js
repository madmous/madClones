'use strict';

import validate from 'express-validation';
import express from 'express';

import { saveUserSchema } from './signUpValidation';
import { saveUser }  from './signUpController';

const router  = express.Router();

router.route('/').post(validate(saveUserSchema), saveUser)

export default router;