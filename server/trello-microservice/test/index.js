import sinon from 'sinon';

import { dbTest } from '../src/config/database';

let isConnected;

const prepareServer = (user, done) => {
  let passportMiddleweare = require('../src/utils/passportMiddleweare');

  let stub = sinon.stub(passportMiddleweare, 'authenticatedWithToken');

  stub.callsFake((req, res, next) => {
    req.user = user;
    
    return next();
  });

  delete require.cache[require.resolve('../src/app')];
  let app = require('../src/app').default;

  let server = app.listen(30001, (err) => {
    dbTest.connect();

    user.save().then(user => done(server, stub, app));
  });
};

export default prepareServer;