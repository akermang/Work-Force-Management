import { combineReducers } from 'redux';
import exampleReducer from './state/example/example.reducer';
import authReducer from './state/auth/auth.reducer';
import userReducer from './state/user/user.reducer';

const rootReducer = combineReducers({
  exampleReducer,
  authReducer,
  userReducer
});

export default rootReducer;