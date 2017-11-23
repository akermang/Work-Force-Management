import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import styles from "./home.page.scss";
import WorkerHomePage from './worker/worker-home.page.jsx';
import ManagerHomePage from './manager/manager-home.page.jsx';
import CeoHomePage from './ceo/ceo-home.page.jsx';

const homePages = {
  worker: WorkerHomePage,
  ceo: CeoHomePage,
  manager: ManagerHomePage
}

class HomePage extends React.Component {
  
  render() {
    const user = this.props.loggedInUser;
    const CurrentHomePage = user ? homePages[user.type] : null;
    return (
      <div className={styles.home}>
        {
          user ? 
            <CurrentHomePage user={user} />  
          : null
        }                
      </div>
    );
  }

};

function mapStateToProps(state) {
  return {
    loggedInUser: state.authReducer.loggedInUser
  };
}

export default withRouter(connect(mapStateToProps)(HomePage));
