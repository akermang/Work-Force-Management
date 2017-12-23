import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TasksComponent from "../../../components/tasks/tasks.component.jsx";
import { ExampleComponent, CanBoardComponent } from "../../../";



class ManagerHomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTasks: false,
      content: "+Tasks"
  }
}

getCanBoardComponent() {
    return this.state.showTasks && !this.props.isLoading ? (
      <CanBoardComponent tasks={this.props.tasks} />
    ) : null;
  }

  getContent() {
    this.setState((this.state.showTasks) ? {content: "+Tasks"} : {content: "-- Tasks"});
  }

  onShowTasks() {
    this.setState((this.state.showTasks) ? {showTasks: false} : {showTasks: true});
    this.getContent();
  }
  render() {
    const user = this.props.user;

    return (
      <div>
        <button type="button" onClick={() => this.onShowTasks()} className="btn btn-info btn-md" value="tasks">
          {this.state.content}
        </button>
        <h2>Manager - home page</h2>
        <div>{this.getCanBoardComponent()}</div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4 bg-success">
              <button type="button" className="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h2>Maneger {user ? user.username : null}</h2>
              <h4>{` HOME ${user.firstName}  ${user.lastName}`}</h4>
              <span>one of three columns-span</span>
              <p>Workforce Management</p>
            </div>

            <div className="col-lg-4 bg-danger">
              <button type="button" className="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h2>two of three columns-h3</h2>
            </div>
            
            <div className="col-lg-4 bg-success">
              <button type="button" className="close" aria-label="Close">
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
function mapStateToProps(state) {
  return {
    tasks: state.tasksReducer.tasks,
    isLoading: state.tasksReducer.loading
  };
}

export default withRouter(connect(mapStateToProps)(ManagerHomePage));



