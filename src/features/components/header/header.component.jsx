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
  <header className={styles.header}>
    <div className={styles.title}>
      <h2>Workforce Management</h2>
    </div>
    <div className="input-group-btn">
      <button
        type="button"
        className="btn btn-default dropdown-toggle  btn-outline-default"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Options <span className="caret" />
      </button>
      <ul className="dropdown-menu dropdown-menu-right">
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

        <div className={styles.link}>{signOutOption(props)}</div>
      </ul>
    </div>

    <div className={styles.link}>{signOutOption(props)}</div>
  </header>
);
function signOutOption(props) {
  if (props.authReducer.isAuthenticated) {
    return (
      <Link className="btn btn-outline-default"
        to="/login"
        onClick={() => {
          props.dispatch({ type: LOGOUT_ACTION });
        }}
      >
        {" "}
        Sign Out{" "}
      </Link>
    );
  } else if (props.location.pathname !== "/login") {
    return (
      <Link className="btn btn-outline-default" to="/login">
        {" "}
        Login{" "}
      </Link>
    );
  } else {
    return <span className="btn btn-outline-default"> Please Login</span>;
  }
}

function mapStateToProps(state) {
  return state;
}

export default withRouter(connect(mapStateToProps)(HeaderComponent));
