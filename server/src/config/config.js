export const dbURI = (() => {
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    return 'mongodb://localhost/trelloCloneApi';
  } else {
    return 'mongodb://mongo:27017/trelloCloneApi';
  }
})();

export const port = (() => {
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    return 3001;
  } else {
    return 80;
  }
})();

export const dbTestURI = 'mongodb://localhost/trelloCloneApiTest';

export const secret = 'apiTest';