import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import styles from "./login.page.scss";
import { FETCH } from "../../../common/actions";
import { FetchAction } from "../../../common/actions";
import { ApiService } from "../../../common/services/api.service";
import {
  START_FETCH_LOGIN,
  FETCH_LOGIN_SUCCESS,
  FETCH_LOGIN_FAIL
} from "../../../common/state/auth/auth.actions";

const LoginPage = (props) => ({
  render() {
    const loggedInUser = this.props.loggedInUser;
    return (
      <div className={styles.login}>
        <form onSubmit={(e) => this.fetchLogin(e)}>
          <label htmlFor="username"> username: </label>
          <input type="text" ref="username" />
          <label htmlFor="password"> password: </label>
          <input type="text" ref="password" />
          <input className={styles.submit} type="submit" value="login" />
        </form>
        {
          loggedInUser ?
            <Redirect to={'/'} />
          : null

        }
      </div>
    );
  },

  componentDidMount(){
    this.refs.username.focus();
  },

  fetchLogin(e) {
    e.preventDefault();
    const o = new ApiService().getOptions("login");    
    const { url, params } = o;    
    const username = this.refs.username.value;
    const password = this.refs.password.value;
    const data = {username: username, password: password};
    params.body = JSON.stringify(data);
    
    const payload = {
      url,
      params: params,
      startActionType: START_FETCH_LOGIN,
      successActionType: FETCH_LOGIN_SUCCESS,
      failActionType: FETCH_LOGIN_FAIL
    };
    this.props.dispatch({ type: FETCH, payload: payload });
  }
});

function mapStateToProps(state) {  
  return { 
    isLoading: state.exampleReducer.loading,
    isAuthenticated: state.authReducer.isAuthenticated,
    loggedInUser: state.authReducer.loggedInUser
  };
};

export default withRouter(connect(mapStateToProps)(LoginPage));
