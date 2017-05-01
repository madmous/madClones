'use strict';

import validate from 'express-validation';
import express from 'express';

import { getUserSchema } from './signinValidation';
import { getUser }  from './signinController';

const router  = express.Router();

router.route('/').get(validate(getUserSchema), getUser)

export default router;