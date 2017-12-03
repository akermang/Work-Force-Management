import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TasksComponent from "../../../components/tasks/tasks.component.jsx";
// import AddUserForm from "../../../components/add-user-form/add-user-form.component.jsx"

class ManagerHomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTasks: true,
      task: {
        description: "Create navigation component",
        status: "to do",
        due_date: "12.12.2017",
        assigned_to: ["yoni"]
      }
    };
  }

  getTasksComponent() {
    return this.state.showTasks ? (
      <TasksComponent task={this.state.task} />
    ) : null;
  }
  render() {
    const user = this.props.user;

    return (
      <div>
        <button type="button" className="btn btn-info">
          Task
        </button>
        <h2>Manager - home page</h2>
        {this.getTasksComponent()}

        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4 bg-success">
              <button type="button" class="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h2>Maneger {user ? user.username : null}</h2>
              <h5>Home</h5>
              <span>one of three columns-span</span>
              <p>Workforce Management</p>
            </div>

            <div className="col-lg-4 bg-danger">
              <button type="button" class="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h2>two of three columns-h3</h2>
            </div>
            
            <div className="col-lg-4 bg-success">
              <button type="button" class="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h2>three of three columns-h4</h2>
            </div>
          </div>
        </div>
        <div>{/* <AddUserForm/> */}</div>
      </div>
    );
  }
}

export default ManagerHomePage;
