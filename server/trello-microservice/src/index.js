'use strict';

import { port } from './config/config';
import app from './app';

import getLogger from './libs/winston';

import { db } from './config/database';

const log = getLogger(module);

let server = app.listen(port, (err) => {
  server.address().port;

  if (err) {
    log.error('something bad happened', err);
  } else {
    db.connect();
  }

  log.info(`server is listening on ${port}`);
});

export default server;