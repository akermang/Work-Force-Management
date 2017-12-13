import React from "react";
import styles from "./header.component.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  LOGOUT_ACTION,
  logoutActivate
} from "../../../common/state/auth/auth.actions";

const HeaderComponent = props => (
  <header className={styles.header + " row"}>
    <div className={styles.title + " col-xs-1"}>
      <h3>WFM</h3>       
    </div>
    <div className="col-lg-1 col-lg-offset-3 hidden-md hidden-sm hidden-xs">{signOutOption(props)}</div>
    <div className="input-group-btn col-xs-1 col-lg-offset-6 col-md-offset-10 col-xs-offset-8">
      <button
        type="button"
        className="btn dropdown-toggle btn-link btn-lg"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
      <div><img className="img-rounded  img-responsive"  src={getSrc(props)} alt="AVATAR"/></div>
       <span className="caret" />
      </button>
      <ul className={styles.userBox + " dropdown-menu  dropdown-menu-right"}>
        <li>
          <div className="btn-lg">
            <div className={styles.user}>{getName(props)}</div>
            <img className={styles.img96px + " img-rounded  img-responsive"} src={getSrc(props)} alt="AVATAR"/>
          </div>
        </li>
        <li role="separator" className="divider" />
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/tasks">Tasks</Link>
        </li>
        <li>
          <Link to="/user/add">Add user</Link>
        </li>
        <li role="separator" className="divider" />
        <li>{signOutOption(props)}</li>
      </ul>
    </div>
    {getLoader(props)}
  </header>
);
function signOutOption(props) {
  if (props.authReducer.isAuthenticated) {
    return (
      <Link
        className={styles.signout}
        to="/login"
        onClick={() => {
          props.dispatch({ type: LOGOUT_ACTION });
        }}
      >
        Sign Out
      </Link>
    );
  } else if (props.location.pathname !== "/login") {
    return (
      <Link className="" to="/login">
        Login
      </Link>
    );
  } else {
    return <span className="btn">Please Login</span>;
  }
}

function getSrc(props){
  if(props.authReducer.loggedInUser) {
    return props.authReducer.loggedInUser.avatar;
  }else {
    return "favicon.png"
  }
}

function getName(props) {
  if(props.authReducer.loggedInUser) {
    return `${props.authReducer.loggedInUser.firstName} ${props.authReducer.loggedInUser.lastName}`;
  }else {
    return "W.F.M"
  }
  
}

function getLoader(props) {
  return props.authReducer.loading ? <div>loading...</div> : null;
}

function mapStateToProps(state) {
  return state;
}

export default withRouter(connect(mapStateToProps)(HeaderComponent));
