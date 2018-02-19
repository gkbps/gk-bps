import { initialState } from '../initial.state';
import { RequestsActionTypes, RequestActionTypes } from './requests.actions';

export function RequestsReducers( state = initialState, { type, payload }) {
  switch (type) {
    case RequestsActionTypes.GET_REQUESTS:
      return Object.assign({}, state, {pending: true, error: null});

    case RequestsActionTypes.GET_REQUESTS_SUCCESS:
      return Object.assign({}, state, {data: payload, pending: false});

    case RequestsActionTypes.GET_REQUESTS_ERROR:
      return Object.assign({}, state, {pending: false, error: 'Error'});

    default:
      return state;
  }
}

export function RequestReducers( state = initialState, { type, payload }) {
  switch (type) {
    case RequestActionTypes.GET_REQUEST:
    case RequestActionTypes.RESET_REQUEST:
    case RequestActionTypes.ADD_REQUEST:
    case RequestActionTypes.SAVE_REQUEST:
    case RequestActionTypes.DELETE_REQUEST:
      return Object.assign({}, state, {pending: true, error: null});

    case RequestActionTypes.GET_REQUEST_SUCCESS:
    case RequestActionTypes.ADD_REQUEST_SUCCESS:
    case RequestActionTypes.SAVE_REQUEST_SUCCESS:
    case RequestActionTypes.DELETE_REQUEST_SUCCESS:
      return Object.assign({}, state, {data: payload, pending: false});

    case RequestActionTypes.GET_REQUEST_ERROR:
    case RequestActionTypes.ADD_REQUEST_ERROR:
    case RequestActionTypes.SAVE_REQUEST_ERROR:
    case RequestActionTypes.DELETE_REQUEST_ERROR:
      return Object.assign({}, state, {pending: false, error: 'Error'});

    default:
      return state;
  }
}
