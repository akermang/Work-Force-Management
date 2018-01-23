var fire = require("../src/fire")
// this file is for testing //
let _endpoints = {
  tasks: {
    all: [],
    byId: id => getTaskById(id)
  }
};

(function allTasks() {
  fire
    .database()
    .ref("tasks")
    .orderByValue()
    .on("value", function(data) {
      console.log(
        "_endpoints.data.val(): " +JSON.stringify( data.val())
      );
      _endpoints.tasks.all = data;
      // data.forEach(function(data) {});
      // console.log("_endpoints.tasks.all: " + _endpoints.tasks.all);
      _endpoints.tasks.all.forEach(function(data) {
        
      });
    });
})();

function getTaskById(id) {
  return fire
    .database()
    .ref("tasks")
    .equalTo(id, "id")
    .toJSON();
}
// module.exports = _endpoints;
export default _endpoints;
