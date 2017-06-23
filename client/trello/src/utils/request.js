import fetch from "isomorphic-fetch";

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON, status from the response
 */
function parseJSON(response) {
  return new Promise(resolve =>
    response.json().then(json =>
      resolve({
        status: response.status,
        json
      })
    )
  );
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {Promise}           The request promise
 */
export default function request(url, options) {
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then(parseJSON)
      .then(response => {
        if (response.status === 200) {
          return resolve(response.json);
        }
        
        return reject(response.json.data);
      })
      .catch(error =>
        reject({
          networkError: error.message
        })
      );
  });
}
