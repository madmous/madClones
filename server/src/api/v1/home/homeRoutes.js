'use strict';

const express = require ('express');
const router  = express.Router();

const homeController = require ('./homeController');

router.get('/', (req, res) => {
  homeController.getBoardsAndOrganizations(req, res);
});

module.exports = router;