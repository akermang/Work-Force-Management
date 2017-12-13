import { combineReducers } from 'redux';
import exampleReducer from './state/example/example.reducer';
import authReducer from './state/auth/auth.reducer';
import userReducer from './state/user/user.reducer';
import tasksReducer from './state/task/task.reducer';

const rootReducer = combineReducers({
  exampleReducer,
  authReducer,
  userReducer,
  tasksReducer
});

export default rootReducer;