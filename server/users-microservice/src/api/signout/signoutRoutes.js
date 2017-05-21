'use strict';

import express from 'express';

import { signoutUser }  from './signoutController';

const router  = express.Router();

router.route('/').get(signoutUser)

export default router;