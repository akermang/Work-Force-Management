import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class ManagerHomePage extends React.Component {
  render() {
    const user = this.props.user;
    return (
      <div>
        <h2>Manager - home page</h2>
        {user ? user.username : null}
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4 row">
              <h2>Maneger </h2>
              <h5>Home</h5>
              <span>one of three columns-span</span>
              
              <p>Workforce Management</p>
              <button
                type="button"
                className="btn btn-default btn-xs col-1 x-btn"
                role="buttom"
              >
              <span className="icon  glyphicon-remove-circle"></span>
              </button>
              
            </div>
            <div className="col-md-4">
              <h3>two of three columns-h3</h3>
              <button
                type="button"
                className="btn btn-default btn-xs col-1 x-btn"
                role="buttom"
              >
                x
              </button>
            </div>
            <div className="col-md-4">
            <h4>three of three columns-h4</h4>
              <button
                type="button"
                className="btn btn-default btn-xs col-1 x-btn"
                role="buttom"
              >
                x
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ManagerHomePage;
