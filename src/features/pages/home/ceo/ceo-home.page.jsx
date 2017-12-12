import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";


class CeoHomePage extends React.Component {
  render() {
    const user = this.props.user;
    return (
      <div>
        <h2>Ceo - home page</h2>
        {user ? user.username : null}
        <div>
          <div className="row">
            <div className="col-sm-6 col-md-6 bg-success" >
              <div className="caption">
                <h3>Today's NET $1.3,000,246</h3>
                <p>workforce ceo</p>
                <div>
                  <button className="btn btn-primary" role="button">
                    Button
                  </button>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-6 bg-info">
              <div className="caption">
                <h3>This week NET $2.4,642,237</h3>
                <p>workforce ceo</p>
                <div>
                  <button className="btn btn-primary" role="button">
                    Button
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6 col-md-12 bg-warning" >
              <div className="caption">
                <h3>This year NET $5.3,000,246</h3>
                <p className="text-success">workforce ceo</p>
                <div>
                  <button className="btn btn-primary" role="button">
                    Button
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default withRouter(connect(null)(CeoHomePage));
