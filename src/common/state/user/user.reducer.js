import userState from "./user.state";
import {
  ADD_USER_SUCCSES,
  ADD_USER_FAIL,
  ADD_USER_START
} from "./user.actions";

function userReducer(state = userState, action) {
  switch (action.type) {
    case ADD_USER_START:
      return { ...state, loading: true };

    case ADD_USER_SUCCSES:
        return { ...state, loading: false };

    case ADD_USER_FAIL:
        return { ...state, loading: false };

    default:
      return state;
  }
}

export default userReducer;
