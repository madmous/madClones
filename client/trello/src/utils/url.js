export const usersUrl = (() => {
  let users = '';

  if (process.env.REACT_APP_ENV === 'kuber-dev') {
    users =  'http://madmous.madclones.server/users/';
  } else if (process.env.REACT_APP_ENV === 'dev' || process.env.REACT_APP_ENV === 'docker-dev' || process.env.REACT_APP_ENV === 'docker-tst') {
    users = 'http://localhost:3002/users/';
  } else {
    users = 'http://madmous-madclones-server.com/users/';
  }

  return users;
})();

export const trelloUrl = (() => {
  let trello = '';

  if (process.env.REACT_APP_ENV === 'kuber-dev') {
    trello =  'http://madmous.madclones.server/trello/';
  } else if (process.env.REACT_APP_ENV === 'dev' || process.env.REACT_APP_ENV === 'docker-dev' || process.env.REACT_APP_ENV === 'docker-tst') {
    trello = 'http://localhost:3001/trello/';
  } else {
    trello = 'http://madmous-madclones-server.com/trello/';
  }

  return trello;
})();