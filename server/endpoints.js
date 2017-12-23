import fire from "../src/fire";

const _endpoints = {
  tasks: {
    all: allTasks(),
    byId: id => getTaskById(id)
  }
};

function allTasks() {
  fire
    .database()
    .ref("tasks")
    .orderByValue()
    .on("value", function(data) {
      data.forEach(function(data) {
        console.log("The data.key: " + data.key + " description: " + data.val().description);
      });
    });
}

function getTaskById(id) {
  return fire
    .database()
    .ref("tasks")
    .equalTo(id, "id")
    .toJSON();
}
export default _endpoints;
