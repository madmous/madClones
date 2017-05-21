export const dbURI = (() => {
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    return 'mongodb://localhost/trelloService';
  } else {
    return 'mongodb://trellodb:27017/trelloService';
  }
})();

export const usersMicroserviceUrl = (() => {
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    return 'http://localhost:3002/';
  } else {
    return 'http://usersmicroservice:3002/';
  }
})();

export const dbTestURI = (() => {
  if (process.env.NODE_ENV === 'docker-test') {
    return 'mongodb://trellodb:27017/trelloService';
  } else if (process.env.NODE_ENV === 'test'){
    return 'mongodb://localhost/trelloServiceTest';
  }
})();

export const port = 3001;