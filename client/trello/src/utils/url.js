export const usersUrl = (() => {
  let users = 'http://localhost:3002/users/';

  if (process.env.REACT_APP_ENV === 'kuber-dev') {
    users =  'http://madclones.local/users/';
  } else {
    users = 'http://madmous-madclones-server.com/users'
  }

  return users;
})();

export const trelloUrl = (() => {
  let trello = 'http://localhost:3001/trello/';

  if (process.env.REACT_APP_ENV === 'kuber-dev') {
    trello =  'http://madclones.local/trello/';
  } else {
    trello = 'http://madmous-madclones-server.com/trello/'
  }

  return trello;
})();