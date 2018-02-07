const fetch = require("isomorphic-fetch");

function request(url, options, callback) {
  if (options.contentType) {
    options.headers = {"Content-Type": options.contentType};
  }
  let status;
  return fetch(API_HOST + url, options).then(res => {    
    status = res.status;
    if(res.ok) { return res.json(); } 
    else { throw new Error(res.statusText); }
  }).then(d => {
    callback ? callback(d, status) : null;
    return d;
  })
}

export default request;
