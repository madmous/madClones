'use strict';

import expressValidation from 'express-validation';

import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import passport from 'passport';
import express from 'express';
import winston from 'winston';
import helmet from 'helmet';
import csurf from 'csurf';
import cors from 'cors';

import getLogger from './libs/winston';
import { port } from './config/config';

import {
  organizationRoutes,
  boardRoutes,
  userRoutes,
  homeRoutes
} from './api/v1/indexRoutes';

import {
  authenticatedWithBasic,
  authenticatedWithToken
} from './utils/passportMiddleweare';

import {
  dbTest,
  db
} from './config/database';

const log = getLogger(module);

const app = express ();

app.use(cors({ origin: true, credentials: true }));

app.use(passport.initialize());
app.use(helmet());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

app.disable('x-powered-by');

app.use('/api/v1/organizations', authenticatedWithToken, organizationRoutes);
app.use('/api/v1/boards', authenticatedWithToken, boardRoutes);
app.use('/api/v1/users', authenticatedWithToken, userRoutes);
app.use('/api/v1/home', authenticatedWithToken, homeRoutes);

app.use(csurf({ cookie: true }));

app.use((err, req, res, next) => {
  if (err instanceof expressValidation.ValidationError) {
    const unifiedErrorMessage = err.errors.map(error => error.messages.join('. ')).join(' and ');

    return res.status(err.status).json({
      message: unifiedErrorMessage
    });
  }
});

app.use((req, res) => {
	res.status(404).json({
		status: 404,
		message: 'The requested URL ' + req.originalUrl + ' was not found on the server.'
	});
});

let server = app.listen(port, (err) => {
  server.address().port;

  if (err) {
    log.error('something bad happened', err);
  } else if (process.env.NODE_ENV === 'test') {
     dbTest.connect();
  } else {
    db.connect();
  }

  log.info(`server is listening on ${port}`);
});

export default server;