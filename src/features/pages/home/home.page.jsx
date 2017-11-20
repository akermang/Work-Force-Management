import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  START_FETCH_EXAMPLE,
  FETCH_EXAMPLE_SUCCESS,
  FETCH_EXAMPLE_FAIL
} from "../../../common/state/example/example.actions";
import { FETCH } from "../../../common/actions";
import { ApiService } from "../../../common/services/api.service";
import { ExampleComponent } from "../../";
import { FetchAction } from "../../../common/actions";
import styles from "./home.page.scss";
import logo from "./assets/react-logo.png";

class HomePage extends React.Component {
  
  render() {
    return (
      <div className={styles.home}>
        <h2 className={styles.title}>Home</h2>
        {this.getComponent()}
        <div className={styles.buttons}>
          <button onClick={() => this.props.history.push("/about")}>
            go to about
          </button>
          <button onClick={() => this.fetchExample()}>fetch example</button>
        </div>
        <div className={styles.logo}>
          <img src={logo} />
        </div>
        {this.getLoader()}
      </div>
    );
  }

  fetchExample() {
    const options = new ApiService().getOptions("example");
    const { url, params } = options;
    const payload = {
      url,
      options: params,
      startActionType: START_FETCH_EXAMPLE,
      successActionType: FETCH_EXAMPLE_SUCCESS,
      failActionType: FETCH_EXAMPLE_FAIL
    };
    this.props.dispatch({ type: FETCH, payload: payload });
  }

  getLoader() {
    return this.props.isLoading ? <div>loading...</div> : null;
  }

  getComponent() {
    return this.props.data ? <ExampleComponent data={this.props.data} /> : null;
  }
};

function mapStateToProps(state) {
  return {
    data: state.exampleReducer.example,
    isLoading: state.exampleReducer.loading
  };
}

export default withRouter(connect(mapStateToProps)(HomePage));
