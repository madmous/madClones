import mongoose from 'mongoose';
import sinon from 'sinon';

import { dbTest } from '../src/config/database';
import getLogger from '../src/libs/winston';
import { port } from '../src/config/config';

const log = getLogger(module);

const prepareServer = (user, done) => {
  delete require.cache[require.resolve('../src/app')];
  
  let app = require('../src/app').default;

  let server = app.listen(port, (err) => {
    log.info(`Test server is listening on ${port}`);

    if (mongoose.connection.readyState === 0) {
      dbTest.connect();
    }

    if (user) {
      user.save().then(user => done(server, app));
    } else {
      done(server, app)
    }
  });
};

export default prepareServer;