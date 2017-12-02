import React from "react";
import { Link } from "react-router-dom";
import styles from "./nav.component.scss";
import { connect } from "react-redux";
import {
  LOGOUT_ACTION,
  logoutActivate
} from "../../../common/state/auth/auth.actions";

const NavComponent = props => (
  <ul className={styles.nav}>
    <li>
      <Link to="/about">About</Link>
    </li>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/tasks">Tasks</Link>
    </li>
    <li>
      <Link to="/user/add">Add user</Link>
    </li>
  </ul>
);

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(NavComponent);
