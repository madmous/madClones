'use strict';

const bodyParser = require ('body-parser');
const express    = require ('express');
const winston    = require ('winston');
const helmet     = require ('helmet');

const userRoutes = require ('./api/v1/users/userRoutes');

const config  = require ('./config/config');
const log     = require ('./libs/winston')(module);
const dbTest  = require ('./config/dbTest');
const db      = require ('./config/db');

const port = 3001;

const app = express ();

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

app.use(allowCrossDomain);

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.disable('x-powered-by');

app.use('/api/v1/users', userRoutes);

app.get('*', (req, res) => {
	res.status(404).json({
		status: 404,
		message: 'The requested URL ' + req.originalUrl + ' was not found on the server.'
	});
});

let server = app.listen(port, (err) => {
  let port = server.address().port;

  if (err) {
    log.error('something bad happened', err);
  } else if (process.env.NODE_ENV === 'test') {
     dbTest.connect();
  } else {
    db.connect();
  }

  log.info(`server is listening on ${port}`);
});

module.exports = server;