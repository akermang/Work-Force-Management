import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class ManagerHomePage extends React.Component {
  render() {
    const user = this.props.user;
    return (
      <div>
          <h2>Manager home page</h2>
          {user ? user.username : null}
      </div>
    )
  }
}

function mapStateToProps(state) {
    return state.user;
}

export default withRouter(connect(mapStateToProps)(ManagerHomePage));