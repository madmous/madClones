export const dbURI = (() => {
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    return 'mongodb://localhost/trelloCloneApi';
  } else {
    return 'mongodb://mongo:27017/trelloCloneApi';
  }
})();

export const usersMicroserviceUrl = (() => {
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    return 'http://localhost:3002';
  } else {
    return 'http://usersmicroservice:3002';
  }
})();

export const dbTestURI = (() => {
  if (process.env.NODE_ENV === 'docker-test') {
    return 'mongodb://mongo:27017/trelloCloneApiTest';
  } else if (process.env.NODE_ENV === 'test'){
    return 'mongodb://localhost/trelloCloneApiTest';
  }
})();

export const port = 3001;