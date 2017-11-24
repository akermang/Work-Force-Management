import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class CeoHomePage extends React.Component {
  render() {
    const user = this.props.user;
    return (
      <div>
          <h2>Ceo - home page</h2>
          {user ? user.username : null}
      </div>
    )
  }
}

function mapStateToProps(state) {
    return  {user: state.user}
}

export default withRouter(connect(null)(CeoHomePage));