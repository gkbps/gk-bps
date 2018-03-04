import { initialState } from '../initial.state';
import { RequestApprovalActionTypes } from './requestApproval.actions';

export function RequestApprovalReducers( state = initialState, { type, payload }) {
  switch (type) {
    case RequestApprovalActionTypes.GET_MANY_REQUEST_APPROVAL:
      return Object.assign({}, state, {pending: true, error: null});

    case RequestApprovalActionTypes.GET_MANY_REQUEST_APPROVAL_SUCCESS:
      return Object.assign({}, state, {data: payload, pending: false});

    case RequestApprovalActionTypes.GET_MANY_REQUEST_APPROVAL_ERROR:
      return Object.assign({}, state, {pending: false, error: 'Error'});

    default:
      return state;
  }
}
