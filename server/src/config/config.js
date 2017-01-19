module.exports = {
  'database': (function() {
    if (process.env.NODE_ENV === 'production') {
      return 'mongodb://mongo:27017/trelloCloneApi'
    } else {
      return 'mongodb://localhost/trelloCloneApi'
    }
  })(),
  'databaseTest': 'mongodb://localhost/trelloCloneApiTest',
  'secret': 'apitest'
};