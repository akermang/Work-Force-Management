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
      <div className= "form-signin" >
       <h2 className={styles.h2} >Login</h2>
        <form onSubmit={(e) => this.fetchLogin(e)}>
          <div className="form-group">
            <label className="label form-contro" htmlFor="username"> username: </label>
            <input className="form-control"  placeholder="Username" type="text" ref="username" />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="password"> password: </label>
            <input className="form-control"  placeholder="Password" type="text" ref="password" />
          </div>
          <div className="checkbox">
            <label className="label">
              <input type="checkbox"/> Remember me
            </label>
          </div>
          <div>
            <input  className={styles.loginBtn + " form-contro btn btn-lg btn-primary btn-block"} type="submit" value="login" />
          </div>
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
