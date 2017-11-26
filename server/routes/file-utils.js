var fs = require("fs");

module.exports = class FileUtils {

  readFile(path, callback) {
    fs.readFile(path, function(err, data) {
      // if (err) throw err;
      console.log(err)
      callback(data);
    });
  }

  writeFile(path, result, callback) {
    fs.writeFile(path, JSON.stringify(result), function(err, data) {
      // if(err) throw err;
      callback(data);
    });
  }
}
