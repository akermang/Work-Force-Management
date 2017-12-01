export const ADD_USER_START = 'ADD_USER_START';
export const ADD_USER_FAIL = 'ADD_USER_FAIL';
export const ADD_USER_SUCCSES = 'ADD_USER_SUCCSES';

export function addUserStart() {
  return {
    type: ADD_USER_START
  };
}

export function addUserfail(payload) {
  return {
    type: ADD_USER_SUCCSES,
    payload,
  };
}

export function addUserSuccses(payload) {
  return {
    type: ADD_USER_FAIL,
    payload,
  };
}
