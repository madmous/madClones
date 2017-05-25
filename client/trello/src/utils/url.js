export const usersUrl = (() => {
  let users = '';

  if (process.env.REACT_APP_ENV === 'kuber-dev') {
    users =  'http://192.168.99.100:31792/';
  } else if (process.env.REACT_APP_ENV === 'dev' || process.env.REACT_APP_ENV === 'docker-dev' || process.env.REACT_APP_ENV === 'docker-tst') {
    users = 'http://localhost:3002/';
  } else {
    users = 'http://35.187.64.216:3002/';
  }

  return users;
})();

export const trelloUrl = (() => {
  let trello = '';

  if (process.env.REACT_APP_ENV === 'kuber-dev') {
    trello =  'http://192.168.99.100:31122/';
  } else if (process.env.REACT_APP_ENV === 'dev' || process.env.REACT_APP_ENV === 'docker-dev' || process.env.REACT_APP_ENV === 'docker-tst') {
    trello = 'http://localhost:3001/';
  } else {
    trello = 'http://104.199.100.179:3001/';
  }

  return trello;
})();