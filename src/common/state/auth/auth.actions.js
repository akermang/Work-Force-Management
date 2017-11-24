export const START_FETCH_LOGIN = 'START_FETCH_LOGIN';
export const FETCH_LOGIN_SUCCESS = 'FETCH_LOGIN_SUCCESS';
export const FETCH_LOGIN_FAIL = 'FETCH_LOGIN_FAIL';
export const LOGOUT_ACTION = 'LOGOUT_ACTION';

export function startFetchLogin() {
  return {
    type: START_FETCH_LOGIN,
  };
}
  
export function fetchLoginSuccess(payload) {
  return {
    type: FETCH_LOGIN_SUCCESS,
    payload,
  };
}

export function fetchLoginFail(payload) {
  return {
    type: FETCH_LOGIN_FAIL,
    payload,
  };
}

export function logoutActivate() {
  return {
    type: LOGOUT_ACTION
  };
}