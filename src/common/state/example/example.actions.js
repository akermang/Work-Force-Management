export const START_FETCH_EXAMPLE = 'START_FETCH_EXAMPLE';
export const FETCH_EXAMPLE_SUCCESS = 'FETCH_EXAMPLE_SUCCESS';
export const FETCH_EXAMPLE_FAIL = 'FETCH_EXAMPLE_FAIL';

export function startFetchExample() {
  return {
    type: START_FETCH_EXAMPLE,
  };
}

export function fetchExampleSuccess(payload) {
  return {
    type: FETCH_EXAMPLE_SUCCESS,
    payload,
  };
}

export function fetchExampleFail(payload) {
  return {
    type: FETCH_EXAMPLE_FAIL,
    payload,
  };
}
