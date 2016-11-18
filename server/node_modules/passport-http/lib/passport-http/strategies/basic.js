/**
 * Module dependencies.
 */
var passport = require('passport-strategy')
  , util = require('util');


/**
 * `BasicStrategy` constructor.
 *
 * The HTTP Basic authentication strategy authenticates requests based on
 * userid and password credentials contained in the `Authorization` header
 * field.
 *
 * Applications must supply a `verify` callback which accepts `userid` and
 * `password` credentials, and then calls the `done` callback supplying a
 * `user`, which should be set to `false` if the credentials are not valid.
 * If an exception occured, `err` should be set.
 *
 * Optionally, `options` can be used to change the authentication realm.
 *
 * Options:
 *   - `realm`  authentication realm, defaults to "Users"
 *
 * Examples:
 *
 *     passport.use(new BasicStrategy(
 *       function(userid, password, done) {
 *         User.findOne({ username: userid, password: password }, function (err, user) {
 *           done(err, user);
 *         });
 *       }
 *     ));
 *
 * For further details on HTTP Basic authentication, refer to [RFC 2617: HTTP Authentication: Basic and Digest Access Authentication](http://tools.ietf.org/html/rfc2617)
 *
 * @param {Object} options
 * @param {Function} verify
 * @api public
 */
function BasicStrategy(options, verify) {
  if (typeof options == 'function') {
    verify = options;
    options = {};
  }
  if (!verify) throw new Error('HTTP Basic authentication strategy requires a verify function');
  
  passport.Strategy.call(this);
  this.name = 'basic';
  this._verify = verify;
  this._realm = options.realm || 'Users';
  this._passReqToCallback = options.passReqToCallback;
}

/**
 * Inherit from `passport.Strategy`.
 */
util.inherits(BasicStrategy, passport.Strategy);

/**
 * Authenticate request based on the contents of a HTTP Basic authorization
 * header.
 *
 * @param {Object} req
 * @api protected
 */
BasicStrategy.prototype.authenticate = function(req) {
  var authorization = req.headers['authorization'];
  if (!authorization) { return this.fail(this._challenge()); }
  
  var parts = authorization.split(' ')
  if (parts.length < 2) { return this.fail(400); }
  
  var scheme = parts[0]
    , credentials = new Buffer(parts[1], 'base64').toString().split(':');

  if (!/Basic/i.test(scheme)) { return this.fail(this._challenge()); }
  if (credentials.length < 2) { return this.fail(400); }
  
  var userid = credentials[0];
  var password = credentials[1];
  if (!userid || !password) {
    return this.fail(this._challenge());
  }
  
  var self = this;
  
  function verified(err, user) {
    if (err) { return self.error(err); }
    if (!user) { return self.fail(self._challenge()); }
    self.success(user);
  }
  
  if (self._passReqToCallback) {
    this._verify(req, userid, password, verified);
  } else {
    this._verify(userid, password, verified);
  }
}

/**
 * Authentication challenge.
 *
 * @api private
 */
BasicStrategy.prototype._challenge = function() {
  return 'Basic realm="' + this._realm + '"';
}


/**
 * Expose `BasicStrategy`.
 */ 
module.exports = BasicStrategy;
