export const START_FETCH_TASKS = 'START_FETCH_TASKS';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_FAIL = 'FETCH_TASKS_FAIL';
export const START_FETCH_TASK_STATUS_UPDATE = 'START_FETCH_TASK_STATUS_UPDATE';
export const FETCH_TASK_STATUS_UPDATE_SUCCESS = 'FETCH_TASK_STATUS_UPDATE_SUCCESS';
export const FETCH_TASK_STATUS_UPDATE_FAIL = 'FETCH_TASK_STATUS_UPDATE_FAIL';

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

export function startFetchTaskStatusUpdate() {
  return {
    type: START_FETCH_TASK_STATUS_UPDATE,
  };
}

export function fetchTaskStatusUpdateSuccess(payload) {
  return {
    type: FETCH_TASK_STATUS_UPDATE_SUCCESS,
    payload,
  };
}

export function fetchTaskStatusUpdateFail(payload) {
  return {
    type: FETCH_TASK_STATUS_UPDATE_FAIL,
    payload,
  };
}
