import React, { Component } from "react";
import fire from "../../../../fire";
import { Link } from "react-router-dom";

class AddTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      avatar: []
    }; // <- set up react state
  }
  componentWillMount() {
    let messagesRef = fire
      .database()
      .ref("tasks")
      .limitToLast(1);
    messagesRef.on("value", snapshot => {
      this.setState({ tasks: snapshot.val() });
    });

    let avatarsRef = fire.database().ref("avatars");
    avatarsRef.on("child_added", snapshot => {
      this.setState({ avatar: snapshot.val() });
    });
  }

  render() {
    return (
      <div>
        <div className="row">
                <ul>{this.getTask()}</ul>
              </div>
        <div className="panel panel-primary">
          <Link className="close" to="/">
            <span>&times;</span>
          </Link>
          <div className="panel-heading">
            <h3 className="panel-title">Creat New Task</h3>
          </div>
          <div className="panel-body bg-info">
            <div className="card-block-rounded">
              <div className="form-group">
                <form onSubmit={this.addTask.bind(this)}>
                
              <label className="text-lowercase h4">description:</label>
                  <input
                    className="form-control"
                    type="text"
                    ref={el => (this.inputEl = el)}
                    autoFocus
                  />
                  <label className="text-lowercase h4">status:</label>
                  <select
                    className="form-control custom-select mb-2 mr-sm-2 mb-sm-0"
                    ref="status"
                  >
                    <option value="to do">to do</option>
                    <option value="in progress">in progress</option>
                  </select>
                  <h4 className="card-subtitle mb-2">due date:</h4>
                  <div className="">
                    <input
                      className="form-control date"
                      type="date"
                      ref="due_date"
                    />
                  </div>
                  <h4 className="" />

                  <button type="submit" className="btn btn-danger">
                    Publish Task
                  </button>
                  <button type="reset" className="btn col-xs-offset-2 btn-info">
                    Clear
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  getTask() {
    let tasks = [];
    for (let key in this.state.tasks) {
      const task = this.state.tasks[key];
      let taskElement = (
        <div key={key} className="task-panel">
          <div className="panel panel-primary">
            <div className="panel-heading">
              <button
                onClick={this.deleteTask.bind(key)}
                type="button"
                className="close"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <h3 className="panel-title">last task: <span className="lead"> {task.description}</span> </h3>
            </div>
            <div className="list-group" />
            <li className="list-group-item list-group-item-warning">
              status: <span className="text-info">{task.status}</span>{" "}
              <button
                onClick={this.updateTaskStatus.bind(key)}
                type="button"
                className="close"
                aria-label="Close"
              >
                <span aria-hidden="true">cancel</span>
              </button>
            </li>
            <li className="list-group-item list-group-item-warning">
              due date: <span className="text-info">{task.due_date}</span>
            </li>
          </div>
        </div>
      );
      tasks.push(taskElement);
    }
    tasks.reverse();
    return tasks;
  }
  addTask(e) {
    e.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the message to Firebase */
    let validateContent = this.inputEl.value;
    validateContent ? validateContent : (validateContent = "No description");
    let date = this.refs.due_date.value;
    date ? date : (date = "Not mentioned");
    const data = {
      description: validateContent,
      status: this.refs.status.value,
      due_date: date
    };
    fire
      .database()
      .ref("tasks")
      .push(data);
    this.inputEl.value = ""; // <- clear the input
  }

  deleteTask() {
    fire
      .database()
      .ref("tasks")
      .child(this)
      .remove();
  }

  updateTaskStatus() {
    fire
      .database()
      .ref("tasks")
      .child(this)
      .update({ status: "Canceled", due_date: "will never be done" });
  }

  uploadFile() {
    let avatarFile = this.refs.avatar.files[0];
    let fileName = avatarFile.name;
    var storageRef = fire.storage().ref();
    var mountainImagesRef = storageRef.child("avatars/" + fileName);
    var uploadFile = mountainImagesRef.put(avatarFile);
    var downloadURL;
    uploadFile.on(
      "state_changed",
      function(snapshot) {},
      function(error) {},
      function() {
        // let fileKey = fire.database().ref("avatars/usersAvatarPath").push().key;
        downloadURL = uploadFile.snapshot.downloadURL;
        let updates = {};
        let postData = {
          url: downloadURL,
          name: fileName,
          user: "user.id galgal"
        };
        fire
          .database()
          .ref("avatars")
          .push(postData);
      }
    );
    // this.setState({ avatar: downloadURL })
  }
}

export default AddTaskForm;
