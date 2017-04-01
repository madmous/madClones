'use strict';

const express = require ('express');
const router  = express.Router();

import { getBoardsAndOrganizations } from './homeController';

router.get('/', (req, res) => {
  getBoardsAndOrganizations(req, res);
});

export default router;