'use strict';

import express from 'express';

import { authenticate } from './loginController';

const router  = express.Router();

router.route('/').post(authenticate);

export default router;