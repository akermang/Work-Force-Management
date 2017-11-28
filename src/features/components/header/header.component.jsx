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
        className="btn btn-default dropdown-toggle"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Action <span className="caret" />
      </button>
      <ul className="dropdown-menu dropdown-menu-right">
        <li>
          <a href="#">Action</a>
        </li>
        <li>
          <a href="#">Another action</a>
        </li>
        <li>
          <a href="#">Something else here</a>
        </li>
        <li role="separator" className="divider" />
        <li>
          <a href="#">Separated link</a>
        </li>
      </ul>
    </div>
    <li role="presentation" className="dropdown">
      <a
        className="dropdown-toggle"
        data-toggle="dropdown"
        href="#"
        role="button"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Dropdown <span className="caret" />
      </a>
      <ul className="dropdown-menu">...</ul>
    </li>
    <div className={styles.link}>{signOutOption(props)}</div>
    <div className="dropdown">
  <a id="dLabel" data-target="#" href="http://example.com" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
    Dropdown trigger
    <span className="caret"></span>
  </a>

  <ul className="dropdown-menu" aria-labelledby="dLabel">
    ...
  </ul>
</div>
  </header>
);
function signOutOption(props) {
  if (props.authReducer.isAuthenticated) {
    return (
      <li>
        <Link
          to="/login"
          onClick={() => {
            props.dispatch({ type: LOGOUT_ACTION });
          }}
        >
          Sign Out{" "}
        </Link>
      </li>
    );
  } else if (props.location.pathname !== "/login") {
    return (
      <Link className="btn btn-outline-success" to="/login">
        {" "}
        Login{" "}
      </Link>
    );
  } else {
    return <span>Please Login</span>;
  }
}

function mapStateToProps(state) {
  return state;
}

export default withRouter(connect(mapStateToProps)(HeaderComponent));
