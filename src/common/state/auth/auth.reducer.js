import authState from "./auth.state";
import {
  START_FETCH_LOGIN,
  FETCH_LOGIN_SUCCESS,
  FETCH_LOGIN_FAIL,
  LOGOUT_ACTION
} from "./auth.actions";

function authReducer(state = authState, action) {
  switch (action.type) {
    case START_FETCH_LOGIN:
      return {
        ...state,
        loading: true,
        corentUser: null,
        token: null
      };

    case FETCH_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedInUser: action.payload.loggedInUser,
        token: setToken(action.payload.loggedInUser.token),
        isAuthenticated: true
      };

    case FETCH_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        loggedInUser: null,
        error: action.payload,
        token: resetToken(),
        isAuthenticated: false
      };

    case LOGOUT_ACTION:
      return {
        ...state,
        loading: false,
        loggedInUser: null,
        error: null,
        token: resetToken(),
        isAuthenticated: false
      };

    default:
      return state;
  }
}

function setToken(token) {
  localStorage.setItem('token', token);
  return token;
}

function resetToken() {
  localStorage.removeItem('token');
  return null;
}

export default authReducer;
