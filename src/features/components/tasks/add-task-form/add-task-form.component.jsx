import React, { Component } from "react";
import styles from "../tasks.component.scss";
import fire from "../../../../fire";
import { Link } from "react-router-dom";
import { ApiService } from "../../../../common/services/api.service";
import {
  START_FETCH_TASK_ADD,
  FETCH_TASK_ADD_SUCCESS,
  FETCH_TASK_ADD_FAIL,
  fetchTasks
} from "../../../../common/state/task/task.actions";
import { connect } from "react-redux";
import { FETCH } from "../../../../common/actions";

class AddTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      avatar: [],
      classState: styles.lead 
    };
  }
  componentDidMount() {
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
    let that = this;
    let classState = this.state.classState;
    for (let key in this.state.tasks) {
      const task = this.state.tasks[key];
      let taskElement = (
        <div key={key} className="task-panel">
          <div className="panel panel-primary">
            <div className="panel-heading">
              <h3 className="panel-title">
                last task: <span className=  {classState + " lead"  }> {task.description}</span>{" "}
              </h3>
            </div>

            <div className="list-group" />
            <li className="list-group-item list-group-item-warning">
              status: <span className={classState + " text-info"}>{task.status}</span>{" "}
            </li>
            <li className="list-group-item list-group-item-warning">
              due date: <span className={classState + " text-info"}>{task.due_date}</span>
              <button
                onClick={this.deleteTask.bind(key, that)}
                type="button"
                className={styles.btnDelete + " btn btn-sm btn-warning"}
                aria-label="close"
              >
                <span aria-hidden="true">delete</span>
              </button>
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
    let validateContent = this.inputEl.value;
    validateContent ? validateContent : (validateContent = "No description");
    let date = this.refs.due_date.value;
    date ? date : (date = "Not mentioned");
    const data = {
      description: validateContent,
      status: this.refs.status.value,
      due_date: date
    };
    this.setState({classState: styles.changed})
    setTimeout(() => {
      this.setState({classState: styles.lead});
    }, 2000)
    this.fetchAadTask(data);
    this.inputEl.value = ""; // <- clear the input
  }

  deleteTask(that , key) {;
    fire
      .database()
      .ref("tasks")
      .child(this)
      .remove()
      .then(fetchTasks(that.props.dispatch))
      .then(that.setState({classState: styles.changed}))
      setTimeout(() => {
        that.setState({classState: styles.lead});
      }, 2200)
      // .then(props.history.push("/"))
  
  

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
    var imagesRef = storageRef.child("avatars/" + fileName);
    var uploadFile = imagesRef.put(avatarFile);
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
  }

  fetchAadTask(taskToAdd) {
    const o = new ApiService().getOptions("addTask");
    const { url, params } = o;

    params.body = JSON.stringify(taskToAdd); //JSON.stringify(data);
    const payload = {
      url,
      params,
      startActionType: START_FETCH_TASK_ADD,
      successActionType: FETCH_TASK_ADD_SUCCESS,
      failActionType: FETCH_TASK_ADD_FAIL
    };
    this.props.dispatch({ type: FETCH, payload: payload });
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(AddTaskForm);
