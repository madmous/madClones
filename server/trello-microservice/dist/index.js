'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _winston3 = require('./libs/winston');

var _winston4 = _interopRequireDefault(_winston3);

var _config = require('./config/config');

var _indexRoutes = require('./api/v1/indexRoutes');

var _passportMiddleweare = require('./utils/passportMiddleweare');

var _database = require('./config/database');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = (0, _winston4.default)(module);

var app = (0, _express2.default)();

app.use((0, _cors2.default)());
app.use(_passport2.default.initialize());
app.use((0, _helmet2.default)());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

app.disable('x-powered-by');

app.use('/api/v1/signup', _indexRoutes.signUpRoutes);

app.use('/api/v1/login', _passportMiddleweare.authenticatedWithBasic, _indexRoutes.loginRoutes);

app.use('/api/v1/organizations', _passportMiddleweare.authenticatedWithToken, _indexRoutes.organizationRoutes);
app.use('/api/v1/boards', _passportMiddleweare.authenticatedWithToken, _indexRoutes.boardRoutes);
app.use('/api/v1/users', _passportMiddleweare.authenticatedWithToken, _indexRoutes.userRoutes);
app.use('/api/v1/home', _passportMiddleweare.authenticatedWithToken, _indexRoutes.homeRoutes);

app.use(function (err, req, res, next) {
  if (err instanceof _expressValidation2.default.ValidationError) {
    var unifiedErrorMessage = err.errors.map(function (error) {
      return error.messages.join('. ');
    }).join(' and ');

    return res.status(err.status).json({
      message: unifiedErrorMessage
    });
  }
});

app.use(function (req, res) {
  res.status(404).json({
    status: 404,
    message: 'The requested URL ' + req.originalUrl + ' was not found on the server.'
  });
});

var server = app.listen(_config.port, function (err) {
  server.address().port;

  if (err) {
    log.error('something bad happened', err);
  } else if (process.env.NODE_ENV === 'test') {
    _database.dbTest.connect();
  } else {
    _database.db.connect();
  }

  log.info('server is listening on ' + _config.port);
});

exports.default = server;