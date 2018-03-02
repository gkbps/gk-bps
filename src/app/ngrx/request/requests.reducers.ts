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
    case RequestActionTypes.SUBMIT_REQUEST:
    case RequestActionTypes.WITHDRAW_REQUEST:
    case RequestActionTypes.CANCEL_REQUEST:
    case RequestActionTypes.RETURN_REQUEST:
    case RequestActionTypes.APPROVE_REQUEST:
    case RequestActionTypes.REJECT_REQUEST:
    case RequestActionTypes.ABORT_REQUEST:
    case RequestActionTypes.POST_REQUEST:
    case RequestActionTypes.REVERT_REQUEST:
      return Object.assign({}, state, {pending: true, error: null});

    case RequestActionTypes.GET_REQUEST_SUCCESS:
    case RequestActionTypes.RESET_REQUEST_SUCCESS:
    case RequestActionTypes.ADD_REQUEST_SUCCESS:
    case RequestActionTypes.SAVE_REQUEST_SUCCESS:
    case RequestActionTypes.SUBMIT_REQUEST_SUCCESS:
    case RequestActionTypes.WITHDRAW_REQUEST_SUCCESS:
    case RequestActionTypes.CANCEL_REQUEST_SUCCESS:
    case RequestActionTypes.RETURN_REQUEST_SUCCESS:
    case RequestActionTypes.APPROVE_REQUEST_SUCCESS:
    case RequestActionTypes.REJECT_REQUEST_SUCCESS:
    case RequestActionTypes.ABORT_REQUEST_SUCCESS:
    case RequestActionTypes.POST_REQUEST_SUCCESS:
    case RequestActionTypes.REVERT_REQUEST_SUCCESS:
      return Object.assign({}, state, {data: payload, pending: false});

    case RequestActionTypes.GET_REQUEST_ERROR:
    case RequestActionTypes.RESET_REQUEST_ERROR:
    case RequestActionTypes.ADD_REQUEST_ERROR:
    case RequestActionTypes.SAVE_REQUEST_ERROR:
    case RequestActionTypes.SUBMIT_REQUEST_ERROR:
    case RequestActionTypes.WITHDRAW_REQUEST_ERROR:
    case RequestActionTypes.CANCEL_REQUEST_ERROR:
    case RequestActionTypes.RETURN_REQUEST_ERROR:
    case RequestActionTypes.APPROVE_REQUEST_ERROR:
    case RequestActionTypes.REJECT_REQUEST_ERROR:
    case RequestActionTypes.ABORT_REQUEST_ERROR:
    case RequestActionTypes.POST_REQUEST_ERROR:
    case RequestActionTypes.REVERT_REQUEST_ERROR:
      return Object.assign({}, state, {pending: false, error: 'Error'});

    default:
      return state;
  }
}
