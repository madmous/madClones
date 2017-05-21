'use strict';

import validate from 'express-validation';
import express from 'express';

import { getUser }  from './signinController';

const router  = express.Router();

router.route('/').post(getUser)

export default router;