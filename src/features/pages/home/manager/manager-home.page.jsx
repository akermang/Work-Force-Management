import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import MudifyTasksComponent from "../../../components/tasks/mudifyTasks.component.jsx";
import { ExampleComponent, CanBoardComponent } from "../../../";

class ManagerHomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTasks: false,
      content: "+Tasks"
    };
  }

  getCanBoardComponent() {
    console.log(this.props.tasks)
    return this.state.showTasks && !this.props.isLoading ? (
      <CanBoardComponent tasks={this.props.tasks} />
    ) : null;
  }

  getContent() {
    this.setState(
      this.state.showTasks ? { content: "+Tasks" } : { content: "-- Tasks" }
    );
  }

  onShowTasks() {
    this.setState(
      this.state.showTasks ? { showTasks: false } : { showTasks: true }
    );
    this.getContent();
  }
  render() {
    const user = this.props.user;

    return (
      <div>
        <button
          type="button"
          onClick={() => this.onShowTasks()}
          className="btn btn-success btn-md"
          value="tasks"
        >
          {this.state.content}
        </button>
        <h2>Manager - home page</h2>
        <div>{this.getCanBoardComponent()}</div>
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <div className=" panel panel-success container-fluid">
                <button type="button" className="close" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                <div className="panel-heading">
                  <h3 className="panel-title">
                    Maneger {user ? user.username : null}
                  </h3>
                </div>
                <div className="panel-body">
                  <h4 className="panel-title">{` ${user.firstName}  ${
                    user.lastName
                  }`}</h4>
                  <p className="h4">Chief Technology Officer</p>

                  <span>Israel  Herzelia </span>
                </div>
                <p className="panel-body text-success">Workforce Management</p>
              </div>
            </div>
          </div>
        </div>
        <div>{/* <AddUserForm/> */}</div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    tasks: state.tasksReducer.tasks,
    isLoading: state.tasksReducer.loading
  };
}

export default withRouter(connect(mapStateToProps)(ManagerHomePage));
