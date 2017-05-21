'use strict';

import validate from 'express-validation';
import express from 'express';

import { saveUserSchema } from './signupValidation';
import { saveUser }  from './signupController';

const router  = express.Router();

router.route('/').post(validate(saveUserSchema), saveUser)

export default router;