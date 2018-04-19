import { initialState } from '../initial.state';
import { RequestHistoriesActionTypes } from './requestHistories.actions';

export function RequestHistoriesReducers( state = initialState, { type, payload }) {
  switch (type) {
    case RequestHistoriesActionTypes.RESET_REQUEST_HISTORIES:
    case RequestHistoriesActionTypes.GET_REQUEST_HISTORIES:
      return Object.assign({}, state, {pending: true, error: null});

    case RequestHistoriesActionTypes.RESET_REQUEST_HISTORIES_SUCCESS:
      return Object.assign({}, state, {data: payload, pending: false});

    case RequestHistoriesActionTypes.GET_REQUEST_HISTORIES_SUCCESS:
      const modifiedPayload = state['data'].concat(payload);
      console.log(modifiedPayload);
      return Object.assign({}, state, {data: modifiedPayload, pending: false});

    case RequestHistoriesActionTypes.RESET_REQUEST_HISTORIES_ERROR:
    case RequestHistoriesActionTypes.GET_REQUEST_HISTORIES_ERROR:
      return Object.assign({}, state, {pending: false, error: 'Error'});

    default:
      return state;
  }
}
