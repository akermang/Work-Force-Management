import authState from "./auth.state";
import {
  START_FETCH_LOGIN,
  FETCH_LOGIN_SUCCESS,
  FETCH_LOGIN_FAIL
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
        loggedInUser: action.payload.loggedInUser
      };

    case FETCH_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        loggedInUser: null,
        error: action.payload
      };

    default:
      return state;
  }
}

export default authReducer;
