'use strict';

const express = require ('express');
const router  = express.Router();

const homeController = require ('./homeController');

router.get('/', (req, res) => {
  homeController.get(req, res);
});

router.get('*', (req, res) => {

	return res.status(405).json({
    data: {
      error: 'You are not allowed to perform that request'
    }
  }); 
});

module.exports = router;