import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class ManagerHomePage extends React.Component {
  render() {
    const user = this.props.user;
    console.log(user)
    return (
      <div>
        <h2>Manager - home page</h2>
        {user ? user.username : null}
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">one of three columns</div>
            <div className="col-md-4">two of three columns</div>
            <div className="col-md-4">three of three columns</div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default withRouter(connect(null)(ManagerHomePage));
