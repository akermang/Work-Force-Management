import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  START_FETCH_EXAMPLE,
  FETCH_EXAMPLE_SUCCESS,
  FETCH_EXAMPLE_FAIL
} from "../../../../common/state/example/example.actions";
import { FETCH } from "../../../../common/actions";
import { ApiService } from "../../../../common/services/api.service";
import { ExampleComponent, CanBoardComponent } from "../../../";
import { FetchAction } from "../../../../common/actions";
import avatar from "../assets/avatar-1.jpg";
import styles from "../home.page.scss";

class WorkerHomePage extends React.Component {
  render() {
    const user = this.props.user;
    return (
      <div>
        <h2>Worker - home page</h2>
        {user ? user.username : null}

        {this.getCanBoardComponent()}
      </div>
    );
  }

  getCanBoardComponent() {
    return this.props.isLoading ? (
      this.getLoader()
    ) : (
      <CanBoardComponent tasks={this.props.tasks} />
    );
  }

  getLoader() {
    return <div>loading...</div>;
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.tasksReducer.tasks,
    isLoading: state.tasksReducer.loading
  };
}

export default withRouter(connect(mapStateToProps)(WorkerHomePage));
