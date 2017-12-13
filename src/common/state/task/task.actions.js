export const START_FETCH_TASKS = 'START_FETCH_TASKS';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_FAIL = 'FETCH_TASKS_FAIL';

export function startFetchTasks() {
  return {
    type: START_FETCH_TASKS,
  };
}

export function fetchTasksSuccess(payload) {
  return {
    type: FETCH_TASKS_SUCCESS,
    payload,
  };
}

export function fetchTasksFail(payload) {
  return {
    type: FETCH_TASKS_FAIL,
    payload,
  };
}
