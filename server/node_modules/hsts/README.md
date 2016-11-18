HTTP Strict Transport Security middleware
========================================
[![Build Status](https://travis-ci.org/helmetjs/hsts.svg?branch=master)](https://travis-ci.org/helmetjs/hsts)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

[_Looking for a changelog?_](https://github.com/helmetjs/helmet/blob/master/HISTORY.md)

This middleware adds the `Strict-Transport-Security` header to the response. This tells browsers, "hey, only use HTTPS for the next period of time". ([See the spec](http://tools.ietf.org/html/rfc6797) for more.)

This will set the Strict Transport Security header, telling browsers to visit by HTTPS for the next 180 days:

```javascript
var hsts = require('hsts')

app.use(hsts({
  maxAge: 15552000  // 180 days in seconds
}))
// Strict-Transport-Security: max-age: 15552000; includeSubDomains
```

Note that the max age must be in seconds. *This was different in previous versions of this module!*

The `includeSubDomains` directive is present by default. If this header is set on *example.com*, supported browsers will also use HTTPS on *my-subdomain.example.com*. You can disable this:

```javascript
app.use(hsts({
  maxAge: 15552000,
  includeSubDomains: false
}))
```

Chrome lets you submit your site for baked-into-Chrome HSTS by adding `preload` to the header. You can add that with the following code, and then submit your site to the Chrome team at [hstspreload.appspot.com](https://hstspreload.appspot.com/).

```javascript
app.use(hsts({
  maxAge: 10886400,        // Must be at least 18 weeks to be approved by Google
  includeSubDomains: true, // Must be enabled to be approved by Google
  preload: true
}))
```

This header will be set `req.secure` is true, a boolean auto-populated by Express. If you're not using Express, that value won't necessarily be set, so you have two options:

```javascript
// Set the header based on a condition
app.use(hsts({
  maxAge: 1234000,
  setIf: function (req, res) {
    return req.secure || (req.headers['x-forwarded-proto'] === 'https')
  }
}))

// ALWAYS set the header
app.use(hsts({
  maxAge: 1234000,
  force: true
}))
```

This only works if your site actually has HTTPS. It won't tell users on HTTP to *switch* to HTTPS, it will just tell HTTPS users to stick around. You can enforce this with the [express-enforces-ssl](https://github.com/aredo/express-enforces-ssl) module. This header is [somewhat well-supported by browsers](http://caniuse.com/#feat=stricttransportsecurity).
