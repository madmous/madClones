let usersUrlToFetch;
let urlToFetch;

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  urlToFetch = 'http://192.168.99.100:31388/';
  usersUrlToFetch = 'http://192.168.99.100:31692/';
} else {
  urlToFetch = 'http://ec2-52-56-95-197.eu-west-2.compute.amazonaws.com/';
}

export const usersUrl = usersUrlToFetch;
export const url = urlToFetch;