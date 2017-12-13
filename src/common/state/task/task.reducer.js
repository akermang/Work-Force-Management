import taskState from './task.state';
import {
    START_FETCH_TASKS,
    FETCH_TASKS_SUCCESS,
    FETCH_TASKS_FAIL,
} from './task.actions';

function tasksReducer(state = taskState, action) {
  switch (action.type) {
    case START_FETCH_TASKS:
      return { ...state, loading: true };

    case FETCH_TASKS_SUCCESS:
      return { ...state, loading: false, tasks: action.payload.tasks };

    case FETCH_TASKS_FAIL:
      return { ...state, loading: false, error: action.payload.error };

    default:
      return state;
  }  
}

export default tasksReducer;
