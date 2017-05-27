export const usersUrl = (() => {
  let users = '';

  if (process.env.REACT_APP_ENV === 'kuber-dev') {
    users =  'http://madclones.local/users/';
  } else if (process.env.REACT_APP_ENV === 'dev' || process.env.REACT_APP_ENV === 'docker-dev' || process.env.REACT_APP_ENV === 'docker-tst') {
    users = 'http://localhost:3002/users/';
  } else {
    users = 'http://35.187.64.216:3002/users/';
  }

  return users;
})();

export const trelloUrl = (() => {
  let trello = '';

  if (process.env.REACT_APP_ENV === 'kuber-dev') {
    trello =  'http://madclones.local/trello/';
  } else if (process.env.REACT_APP_ENV === 'dev' || process.env.REACT_APP_ENV === 'docker-dev' || process.env.REACT_APP_ENV === 'docker-tst') {
    trello = 'http://localhost:3001/trello/';
  } else {
    trello = 'http://104.199.100.179:3001/trello/';
  }

  return trello;
})();