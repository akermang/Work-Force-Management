import { ApiService } from "./common/services/api.service.js";
import { START_FETCH_LOGIN, FETCH_LOGIN_SUCCESS, FETCH_LOGIN_FAIL } from "./common/state/auth/auth.actions";
import { FETCH } from './common/actions';
import { START_FETCH_TASKS, FETCH_TASKS_SUCCESS, FETCH_TASKS_FAIL } from "./common/state/task/task.actions";

export default function initiateData(store) {
  authenticate(store);
  fetchTasks(store.dispatch);
}

function authenticate(store) {
  const endpoint = new ApiService().getOptions("auth");
  const { url, params } = endpoint;  
  const token = store.getState().authReducer.token;
  const body = JSON.stringify({token: token});  
  params.body = body;
  const payload = {
    url: endpoint.url,
    params: endpoint.params,
    startActionType: START_FETCH_LOGIN,
    successActionType: FETCH_LOGIN_SUCCESS,
    failActionType: FETCH_LOGIN_FAIL
  };  
  const authenticationAction = {type: FETCH, payload: payload};
  store.dispatch(authenticationAction);
}

function fetchTasks(dispatch) {
  const endpoint = new ApiService().getOptions("getTasks");  
  const { url, params } = endpoint;  
  
  const payload = {
    url: endpoint.url,
    params: endpoint.params,
    startActionType: START_FETCH_TASKS,
    successActionType: FETCH_TASKS_SUCCESS,
    failActionType: FETCH_TASKS_FAIL
  };
  dispatch({type: FETCH, payload: payload});  
}