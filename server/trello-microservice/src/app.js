'use strict';

import expressValidation from 'express-validation';

import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import express from 'express';
import winston from 'winston';
import helmet from 'helmet';
import csurf from 'csurf';
import cors from 'cors';

import getLogger from './libs/winston';

import {
  organizationRoutes,
  signInRoutes,
  signUpRoutes,
  boardRoutes,
  userRoutes,
  homeRoutes
} from './api/indexRoutes';

import { 
  authenticatedWithToken,
  authenticatedWithBasic 
} from './utils/passportMiddleweare';

const log = getLogger(module);

const app = express ();

const rootUrl = '/api/';

app.use(cors({ origin: true, credentials: true }));

app.use(helmet());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

app.disable('x-powered-by');

app.use(`${rootUrl}signin`, authenticatedWithBasic, signInRoutes);
app.use(`${rootUrl}signup`, signUpRoutes);

app.use(`${rootUrl}organizations`, authenticatedWithToken, organizationRoutes);
app.use(`${rootUrl}boards`, authenticatedWithToken, boardRoutes);
app.use(`${rootUrl}users`, authenticatedWithToken, userRoutes);
app.use(`${rootUrl}home`, authenticatedWithToken, homeRoutes);

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

export default app;