module.exports = {
  'database': (function() {
    if (process.env.NODE_ENV === 'development') {
      return 'mongodb://localhost/trelloCloneApi';
    } else {
      return 'mongodb://mongo:27017/trelloCloneApi';
    }
  })(),
  'port': (function() {
    if (process.env.NODE_ENV === 'development') {
      return 3001;
    } else {
      return 80;
    }
  })(),
  'databaseTest': 'mongodb://localhost/trelloCloneApiTest',
  'secret': 'apitest'
};