import React from 'react';
import { Route, withRouter, Link } from 'react-router-dom';
import { HeaderComponent, NavComponent } from '../features';
import { connect } from 'react-redux';

const constants = {
  home: '/',
  about: '/about',
  addUser: '/user/add',
  tasks: '/tasks'
}

const allLinks = {
  worker: [
    {path: constants.home, text: 'home'},
    {path: constants.about, text: 'about'},
    {path: constants.tasks, text: 'tasks'},
  ],
  manager: [  
    {path: constants.home, text: 'home'},
    {path: constants.about, text: 'about'},    
    {path: constants.tasks, text: 'tasks'},
    {path: constants.addUser, text: 'add user'}
  ],
  ceo: [
    {path: constants.home, text: 'home'},
    {path: constants.about, text: 'about'},    
    {path: constants.tasks, text: 'tasks'},
    {path: constants.addUser, text: 'add user'}
  ]
}

const DefaultLayout = ({ component: Component, ...rest }) => ({
  render() {
    const user = this.props.loggedInUser || {};
    const links = user.type ? allLinks[user.type] : null;    
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
