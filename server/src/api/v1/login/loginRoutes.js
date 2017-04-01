'use strict';

const express = require ('express');
const router  = express.Router();

import { authenticate } from './loginController';

router.route('/')
  .post(authenticate);

export default router;