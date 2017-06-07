export const usersUrl = (() => {
  let users = '';

  if (process.env.REACT_APP_ENV === 'dev' || process.env.REACT_APP_ENV === 'docker-dev') { 
    users = 'http://localhost:3002/';
  } else if (process.env.REACT_APP_ENV === 'kuber-dev') {
    users = 'http://madclones.local/users/';
  } else if (process.env.REACT_APP_ENV === 'prod')  {
    users = 'http://104.154.41.57:3002/'
  }

  return users;
})();

export const trelloUrl = (() => {
  let trello = '';

  if (process.env.REACT_APP_ENV === 'dev' || process.env.REACT_APP_ENV === 'docker-dev') { 
    trello = 'http://localhost:3001/';
  } else if (process.env.REACT_APP_ENV === 'kuber-dev') {
    trello = 'http://madclones.local/trello/';
  } else if (process.env.REACT_APP_ENV === 'prod') {
    trello = 'http://130.211.201.76:3001/'
  }

  return trello;
})();