var fs = require("fs");

module.exports = class FileUtils {

  readFile(path, callback) {
    fs.readFile(path, function(err, data) {
      callback(data);
    });
  }

  writeFile(path, result, callback) {
    fs.writeFile(path, JSON.stringify(result), function(err, data) {
      if(err) throw err;
      callback(data);
    });
  }
}


// var x = './server/mock/users.json';
// fs.watch(x, {
//   persistent: true
// }, function(event, x) {
//   console.log(event + " event occurred on " + x);
// });
