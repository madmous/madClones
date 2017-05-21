'use strict';

import express from 'express';

import { save }  from './signcheckController';

const router  = express.Router();

router.route('/').get(save)

export default router;