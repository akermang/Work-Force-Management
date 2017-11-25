import React from 'react';
import styles from './header.component.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { LOGOUT_ACTION, logoutActivate } from "../../../common/state/auth/auth.actions";

const HeaderComponent = (props) => (
  <header className={styles.header}>
    <div className={styles.title}>
      <h2>Work force management</h2>
    </div>
    <div className={styles.link}>
      {signOutOption(props)}
    </div>
  </header>
  
);
function signOutOption(props) {
  if(props.authReducer.isAuthenticated) {
    return <li><Link to="/login" onClick={() => {props.dispatch({type: LOGOUT_ACTION})}}>Sign Out </Link></li>
  }else {
    return <h2>please sign in</h2>
  }
}

function mapStateToProps(state) {
  return state;
}

export default withRouter(connect(mapStateToProps)(HeaderComponent));

