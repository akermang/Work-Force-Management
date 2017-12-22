import React from 'react';
import { Route, withRouter, Link } from 'react-router-dom';
import { HeaderComponent, NavComponent } from '../features';
import { connect } from 'react-redux';

const constants = {
  home: '/',
  about: '/about',
  addUser: '/user/add',
  tasks: '/tasks',
  login: '/login'
}

const allLinks = {
  worker: [
    {path: constants.home, text: 'home'},
    {path: constants.tasks, text: 'New task'},
  ],
  manager: [  
    {path: constants.home, text: 'home'},
    {path: constants.tasks, text: 'New task'},
    {path: constants.addUser, text: 'add user'}
  ],
  ceo: [
    {path: constants.home, text: 'home'},
    {path: constants.tasks, text: 'New task'},
    {path: constants.addUser, text: 'add user'}
  ],
  public: [
    {path: constants.about, text: 'about'},
    {path: constants.login, text: 'login'}
  ]
}

const DefaultLayout = ({ component: Component, ...rest }) => ({
  render() {
    const user = this.props.loggedInUser || {};
    const links = user.type ? allLinks[user.type] : allLinks.public ;    
    return (
      <Route
        {...rest}
        render={matchProps => (
          <div>
            <HeaderComponent />
            <div className="wrapper default">
            {
              links ? 
                <NavComponent links={links} />
              : null
            }              
              <Component {...matchProps} />
            </div>
          </div>
        )}
      />
    );
  },
});

function mapStateToProps(state) {
  return {loggedInUser: state.authReducer.loggedInUser};
}

export default withRouter(connect(mapStateToProps)(DefaultLayout));
