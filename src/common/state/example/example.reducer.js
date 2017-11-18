import exampleState from './example.state';
import {
  FETCH_EXAMPLE_SUCCESS,
  FETCH_EXAMPLE_FAIL,
  START_FETCH_EXAMPLE,
} from './example.actions';

function exampleReducer(state = exampleState, action) {
  switch (action.type) {
    case START_FETCH_EXAMPLE:
      return {
        ...state, loading: true, example: null, error: null,
      };

    case FETCH_EXAMPLE_SUCCESS:
      return { ...state, loading: false, example: action.payload.data };

    case FETCH_EXAMPLE_FAIL:
      return {
        ...state, loading: false, example: null, error: action.payload,
      };

    default:
      return state;
  }  
}

export default exampleReducer;
