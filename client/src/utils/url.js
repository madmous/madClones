let urlToFetch;

if (process.env.NODE_ENV === 'development') {
  urlToFetch = 'http://localhost:3001/';
} else {
  urlToFetch = 'http://ec2-52-56-95-197.eu-west-2.compute.amazonaws.com/';
}

export const url = urlToFetch;