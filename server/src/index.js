'use strict';

const bodyParser = require ('body-parser');
const express    = require ('express');
const winston    = require ('winston');
const helmet     = require ('helmet');

const userRoutes = require ('./api/users/userRoutes');

const log = require ('./libs/winston')(module);
const db  = require ('./config/db');

const port = 3001;

const app = express ();

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.disable('x-powered-by');

app.use('/api/users', userRoutes);

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
  }

  log.info(`server is listening on ${port}`);
});

module.exports = server;