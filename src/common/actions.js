export const FETCH = 'FETCH';

export const FetchAction = payload => ({
  type: FETCH,
  payload: {
    url: payload.url,
    params: payload.params,
    successActionType: payload.successActionType,
    failActionType: payload.failActionType,
  },
});
