import { FETCH } from "../common/actions";
import request from "../common/services/http.services";

const fetchMiddleware = store => next => action => {
  if (action.type === FETCH) {
    const {
      url,
      params,
      startActionType,
      successActionType,
      failActionType
    } = action.payload;
    store.dispatch({ type: startActionType });
    return request(url, params, response => {
      if (response.statusCode >= 200 && response.statusCode <= 226) {
        store.dispatch({ type: successActionType, payload: response });
      } else {
        store.dispatch({ type: failActionType, payload: response });
      }
    });
  }
  return next(action);
};

export default fetchMiddleware;
