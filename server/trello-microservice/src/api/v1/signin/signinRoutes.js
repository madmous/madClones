'use strict';

import validate from 'express-validation';
import express from 'express';

import { getUserSchema } from './signinValidation';
import { getUser }  from './signinController';

const router  = express.Router();

// TODO: fix validate
router.route('/').post(getUser)

export default router;