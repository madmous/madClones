export const usersUrl = (() => {
  let users = 'http://localhost:3002/';

  if (process.env.REACT_APP_ENV === 'kuber-dev') {
    users = 'http://madclones.local/users/';
  } else {
    users = 'http://104.154.41.57:3002/'
  }

  return users;
})();

export const trelloUrl = (() => {
  let trello = 'http://localhost:3001/';

  if (process.env.REACT_APP_ENV === 'kuber-dev') {
    trello = 'http://madclones.local/trello/';
  } else {
    trello = 'http://130.211.201.76:3001/'
  }

  return trello;
})();