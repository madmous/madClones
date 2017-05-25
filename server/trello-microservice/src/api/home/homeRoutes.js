'use strict';

import express from 'express';

import { getBoardsAndOrganizations } from './homeController';

const router  = express.Router();

router.route('/').get(getBoardsAndOrganizations);

export default router;