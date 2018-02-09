import React from 'react';
import { Route, withRouter, Link } from 'react-router-dom';
import { HeaderComponent, NavComponent } from '../features';
import { connect } from 'react-redux';

const constants = {
  home: '/',
  about: '/about',
  addUser: '/user/add',
  addTask: '/task/add',
  login: '/login'
}

const allLinks = {
  worker: [
    {path: constants.home, text: 'Home'},
    {path: constants.addTask, text: 'Add task'},
  ],
  manager: [  
    {path: constants.home, text: 'Home'},
    {path: constants.addTask, text: 'Add task'},
    {path: constants.addUser, text: 'Add user'}
  ],
  ceo: [
    {path: constants.home, text: 'Home'},
    {path: constants.addTask, text: 'Add task'},
    {path: constants.addUser, text: 'Add user'}
  ],
  public: [
    {path: constants.about, text: 'About'},
    {path: constants.login, text: 'Login'}
  ]
}

class DefaultLayout extends React.Component {
  render() {
    const Component = this.props.component;
    const user = this.props.loggedInUser || {};
    const links = user.type ? allLinks[user.type] : allLinks.public;

    return (
      <div>
        <HeaderComponent />
        <div className="wrapper default">
            {
              links ? 
                <NavComponent links={links} />
              : null
            }              
            <Component {...this.props} />
        </div>
      </div>
    )
  }
};

function mapStateToProps(state) {
  return {loggedInUser: state.authReducer.loggedInUser};
}

export default withRouter(connect(mapStateToProps)(DefaultLayout));
