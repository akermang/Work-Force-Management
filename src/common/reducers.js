import { combineReducers } from 'redux';
import exampleReducer from './state/example/example.reducer';
import authReducer from './state/auth/auth.reducer';

const rootReducer = combineReducers({
  exampleReducer,
  authReducer
});

export default rootReducer;