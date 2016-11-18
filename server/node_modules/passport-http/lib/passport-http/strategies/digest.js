/**
 * Module dependencies.
 */
var passport = require('passport-strategy')
  , crypto = require('crypto')
  , util = require('util');


/**
 * `DigestStrategy` constructor.
 *
 * The HTTP Digest authentication strategy authenticates requests based on
 * username and digest credentials contained in the `Authorization` header
 * field.
 *
 * Applications must supply a `secret` callback, which is used to look up the
 * user and corresponding password (aka shared secret) known to both the server
 * and the client, supplying them to the `done` callback as `user` and
 *`password`, respectively.  The strategy will use the password to compute the
 * response hash, failing authentication if it does not match that found in the
 * request. If the username is not valid, `user` should be set to false.  If an
 * exception occured, `err` should be set.
 *
 * An optional `validate` callback can be supplied, which receives `params`
 * containing nonces that the server may want to track and validate.
 *
 * Options:
 *   - `realm`      authentication realm, defaults to "Users"
 *   - `domain`     list of URIs that define the protection space
 *   - `algorithm`  algorithm used to produce the digest (MD5 | MD5-sess)
 *   - `qop`        list of quality of protection values support by the server (auth | auth-int) (recommended: auth)
 *
 * `validate` params:
 *   - `nonce`   unique string value specified by the server
 *   - `cnonce`  opaque string value provided by the client
 *   - `nc`      count of the number of requests (including the current request) that the client has sent with the nonce value
 *   - `opaque`  string of data, specified by the server, which should be returned by the client in subsequent requests
 *
 * Examples:
 *
 *     passport.use(new DigestStrategy({ qop: 'auth' },
 *       function(username, done) {
 *         // secret callback
 *         User.findOne({ username: username }, function (err, user) {
 *           if (err) { return done(err); }
 *           return done(null, user, user.password);
 *         });
 *       },
 *       function(params, done) {
 *         // validate callback, check nonces in params...
 *         done(err, true);
 *       }
 *     ));
 *
 * For further details on HTTP Basic authentication, refer to [RFC 2617: HTTP Authentication: Basic and Digest Access Authentication](http://tools.ietf.org/html/rfc2617)
 *
 * @param {Object} options
 * @param {Function} secret
 * @param {Function} validate
 * @api public
 */
function DigestStrategy(options, secret, validate) {
  if (typeof options == 'function') {
    validate = secret;
    secret = options;
    options = {};
  }
  if (!secret) throw new Error('HTTP Digest authentication strategy requires a secret function');
  
  passport.Strategy.call(this);
  this.name = 'digest';
  this._secret = secret;
  this._validate = validate;
  this._realm = options.realm || 'Users';
  if (options.domain) {
    this._domain = (Array.isArray(options.domain)) ? options.domain : [ options.domain ];
  }
  this._opaque = options.opaque;
  this._algorithm = options.algorithm;
  if (options.qop) {
    this._qop = (Array.isArray(options.qop)) ? options.qop : [ options.qop ];
  }
}

/**
 * Inherit from `passport.Strategy`.
 */
util.inherits(DigestStrategy, passport.Strategy);

/**
 * Authenticate request based on the contents of a HTTP Digest authorization
 * header.
 *
 * @param {Object} req
 * @api protected
 */
DigestStrategy.prototype.authenticate = function(req) {
  var authorization = req.headers['authorization'];
  if (!authorization) { return this.fail(this._challenge()); }
  
  var parts = authorization.split(' ')
  if (parts.length < 2) { return this.fail(400); }
  
  var scheme = parts[0]
    , params = parts.slice(1).join(' ');
  
  if (!/Digest/i.test(scheme)) { return this.fail(this._challenge()); }
  
  var creds = parse(params);
  if (Object.keys(creds).length === 0) { return this.fail(400); }
  
  if (!creds.username) {
    return this.fail(this._challenge());
  }
  if (req.url !== creds.uri) {
    return this.fail(400);
  }
  
  
  var self = this;
  
  // Use of digest authentication requires a password (aka shared secret) known
  // to both the client and server, but not transported over the wire.  This
  // secret is needed in order to compute the hashes required to authenticate
  // the request, and can be obtained by calling the secret() function the
  // application provides to the strategy.  Because username is the key for a
  // database query, a `user` instance is also obtained from this callback.
  // However, the user will only be successfully authenticated if the password
  // is correct, as indicated by the challenge response matching the computed
  // value.
  this._secret(creds.username, function(err, user, password) {
    if (err) { return self.error(err); }
    if (!user) { return self.fail(self._challenge()); }
    
    var ha1;
    if (!creds.algorithm || creds.algorithm === 'MD5') {
      if (typeof password === 'object' && password.ha1) {
        ha1 = password.ha1;
      } else  {
        ha1 = md5(creds.username + ":" + creds.realm + ":" + password);
      }
    } else if (creds.algorithm === 'MD5-sess') {
      // TODO: The nonce and cnonce used here should be the initial nonce
      //       value generated by the server and the first nonce value used by
      //       the client.  This creates a 'session key' for the authentication
      //       of subsequent requests.  The storage of the nonce values and the
      //       resulting session key needs to be investigated.
      //
      //       See RFC 2617 (Section 3.2.2.2) for further details.
      ha1 = md5(md5(creds.username + ":" + creds.realm + ":" + password) + ":" + creds.nonce + ":" + creds.cnonce);
    } else {
      return self.fail(400);
    }
    
    var ha2;
    if (!creds.qop || creds.qop === 'auth') {
      ha2 = md5(req.method + ":" + creds.uri);
    } else if (creds.qop === 'auth-int') {
      // TODO: Implement support for auth-int.  Note that the raw entity body
      //       will be needed, not the parsed req.body property set by Connect's
      //       bodyParser middleware.
      //
      //       See RFC 2617 (Section 3.2.2.3 and Section 3.2.2.4) for further
      //       details.
      return self.error(new Error('auth-int not implemented'));
    } else {
      return self.fail(400);
    }
    
    var digest;
    if (!creds.qop) {
      digest = md5(ha1 + ":" + creds.nonce + ":" + ha2);
    } else if (creds.qop === 'auth' || creds.qop === 'auth-int') {
      digest = md5(ha1 + ":" + creds.nonce + ":" + creds.nc + ":" + creds.cnonce + ":" + creds.qop + ":" + ha2);
    } else {
      return self.fail(400);
    }
    
    if (creds.response != digest) {
      return self.fail(self._challenge());
    } else {
      if (self._validate) {
        self._validate({
            nonce: creds.nonce,
            cnonce: creds.cnonce,
            nc: creds.nc,
            opaque: creds.opaque
          },
          function(err, valid) {
            if (err) { return self.error(err); }
            if (!valid) { return self.fail(self._challenge()); }
            self.success(user);
          });
      } else {
        self.success(user);
      }
    }
  });
}

/**
 * Authentication challenge.
 *
 * @api private
 */
DigestStrategy.prototype._challenge = function() {
  // TODO: For maximum flexibility, a mechanism for delegating the generation
  //       of the nonce and opaque data to the application would be useful.
  
  var challenge = 'Digest realm="' + this._realm + '"';
  if (this._domain) {
    challenge += ', domain="' + this._domain.join(' ') + '"';
  }
  challenge += ', nonce="' + nonce(32) + '"';
  if (this._opaque) {
    challenge += ', opaque="' + this._opaque + '"';
  }
  if (this._algorithm) {
    challenge += ', algorithm=' + this._algorithm;
  }
  if (this._qop) {
    challenge += ', qop="' + this._qop.join(',') + '"';
  }
  
  return challenge;
}


/**
 * Parse authentication response.
 *
 * @api private
 */
function parse(params) {
  var opts = {};
  var tokens = params.split(/,(?=(?:[^"]|"[^"]*")*$)/);
  for (var i = 0, len = tokens.length; i < len; i++) {
    var param = /(\w+)=["]?([^"]+)["]?$/.exec(tokens[i])
    if (param) {
      opts[param[1]] = param[2];
    }
  }
  return opts;
}

/**
 * Return a unique nonce with the given `len`.
 *
 *     utils.uid(10);
 *     // => "FDaS435D2z"
 *
 * CREDIT: Connect -- utils.uid
 *         https://github.com/senchalabs/connect/blob/1.7.1/lib/utils.js
 *
 * @param {Number} len
 * @return {String}
 * @api private
 */
function nonce(len) {
  var buf = []
    , chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    , charlen = chars.length;

  for (var i = 0; i < len; ++i) {
    buf.push(chars[Math.random() * charlen | 0]);
  }

  return buf.join('');
};


/**
 * Return md5 hash of the given string and optional encoding,
 * defaulting to hex.
 *
 *     utils.md5('wahoo');
 *     // => "e493298061761236c96b02ea6aa8a2ad"
 *
 * CREDIT: Connect -- utils.md5
 *         https://github.com/senchalabs/connect/blob/1.7.1/lib/utils.js
 *
 * @param {String} str
 * @param {String} encoding
 * @return {String}
 * @api private
 */
function md5(str, encoding){
  return crypto
    .createHash('md5')
    .update(str)
    .digest(encoding || 'hex');
};


/**
 * Expose `DigestStrategy`.
 */ 
module.exports = DigestStrategy;
