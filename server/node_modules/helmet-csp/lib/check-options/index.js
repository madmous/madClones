var checkDirective = require('./check-directive')
var dasherize = require('dasherize')

module.exports = function (options) {
  if (!options) {
    throw new Error('csp must be called with arguments. See the documentation.')
  }

  var directives = options.directives

  var directivesExist = Object.prototype.toString.call(directives) === '[object Object]'
  if (!directivesExist || Object.keys(directives).length === 0) {
    throw new Error('csp must have at least one directive under the "directives" key. See the documentation.')
  }

  Object.keys(directives).forEach(function (directiveKey) {
    checkDirective(dasherize(directiveKey), directives[directiveKey], options)
  })
}
