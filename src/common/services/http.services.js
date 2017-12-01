const fetch = require('isomorphic-fetch');

function request(url, options, callback) {  
  fetch(API_HOST + url, options).then(data => data.json()).then((response) => {
    callback(response);
  });
}

export default request;