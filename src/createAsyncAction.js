export default function createAsyncAction (type, fn) {
    return (...args) => async (dispatch) => {
      dispatch({
        type: `${type}_STARTED`,
        payload: args
      });
      let result;
      try {
        result = await fn(...args);
      } catch (error) {
        dispatch({
          type: `${type}_FAILED`,
          error: true,
          payload: error
        });
        throw error;
      }
      dispatch({
        type: `${type}_SUCCESS`,
        payload: result
      });
      return result;
    }
  }

// implementation

//   let addTodo = createAsyncAction(
//     'ADD_TODO',
//     (text) => Api.createTodo(text)
//   );
//   //later on
//   dispatch(addTodo('publish blog post'));