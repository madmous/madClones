let usersUrlToFetch;
let urlToFetch;

/*if (process.env.NODE_ENV === 'kuber-dev') {
  usersUrlToFetch = 'http://192.168.99.100:31692/';
  urlToFetch = 'http://192.168.99.100:31388/';
} else if (process.env.NODE_ENV === 'docker-dev' || process.env.NODE_ENV === 'docker-tst') {
  usersUrlToFetch = 'http://localhost:3002/';
  urlToFetch = 'http://localhost:3001/';
} else {
  urlToFetch = 'http://ec2-52-56-95-197.eu-west-2.compute.amazonaws.com/';
}*/

usersUrlToFetch = 'http://localhost:3002/';
urlToFetch = 'http://localhost:3001/';

export const usersUrl = usersUrlToFetch;
export const url = urlToFetch;