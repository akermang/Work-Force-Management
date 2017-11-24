import { ApiService } from "./common/services/api.service.js";
import {
  START_FETCH_LOGIN,
  FETCH_LOGIN_SUCCESS,
  FETCH_LOGIN_FAIL
} from "./common/state/auth/auth.actions";
import { FETCH } from './common/actions';

export default function initiateData(store) {
  authenticate(store);
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
