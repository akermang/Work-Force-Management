import React, { Component } from "react";
import fire from "../../../../fire";
import { Link } from "react-router-dom";

class AddTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = { tasks: [] }; // <- set up react state
  }
  componentDidMount() {
    /* Create reference to messages in Firebase Database */
    let messagesRef = fire.database().ref("tasks");
    // .orderByKey();
    // .limitToLast(100);
    messagesRef.on("value", snapshot => {
      /* Update React state when message is added at Firebase Database */
      this.setState({ tasks: snapshot.val() });
    });
  }

  render() {
    return (
      <div>
        <div className="panel panel-primary">
        <Link className="close" to="/"><span >&times;</span></Link>
          <div className="panel-heading">
            <h3 className="panel-title">Creat New Task</h3>
          </div>
          <div className="panel-body bg-info">
            <div className="card-block-rounded">
              <div className="form-group">
                <label className="text-lowercase h4">description:</label>
                <form onSubmit={this.addTask.bind(this)}>
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
        <ul>
          {/* Render the list of messages */}
          {this.getTask()}
        </ul>
      </div>
    );
  }
  getTask() {
    let tasks = [];
    for (let key in this.state.tasks) {
      const task = this.state.tasks[key];
      let taskElement = <div className="panel panel-warning" key={key}>
        <div className="panel-heading">
          <h3 className="panel-title">{task.description}</h3>
        </div>
        <div className="list-group" />
        <li className="list-group-item text-primary">status: {task.status}</li>
        <li className="list-group-item text-primary">
          due date: {task.due_date}
        </li>
      </div>
      tasks.push(taskElement);
    }
    return tasks;
  }
  addTask(e) {
    e.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the message to Firebase */
    const data = {
      description: this.inputEl.value,
      status: this.refs.status.value,
      due_date: this.refs.due_date.value
    };
    fire
      .database()
      .ref("tasks")
      .push(data);
    this.inputEl.value = ""; // <- clear the input
  }
}

export default AddTaskForm;
