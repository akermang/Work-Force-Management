const fetch = require("isomorphic-fetch");

function request(url, options, callback) {
  var data = options.body;
  var oReq = new XMLHttpRequest();
  oReq.open(options.method, API_HOST + url);
  if (options.contentType) {
    oReq.setRequestHeader("Content-Type", options.contentType);
  }
  oReq.send(data);

  oReq.addEventListener("loadend", function(d) {    
    callback(JSON.parse(d.currentTarget.response), d.currentTarget.status);
  });
}

export default request;
