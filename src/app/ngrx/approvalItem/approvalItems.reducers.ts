import { initialState } from '../initial.state';
import { ApprovalItemsActionTypes } from './approvalItems.actions';

export function ApprovalItemsReducers( state = initialState, { type, payload }) {
  switch (type) {
    case ApprovalItemsActionTypes.GET_MANY_APPROVAL_ITEMS:
      return Object.assign({}, state, {pending: true, error: null});

    case ApprovalItemsActionTypes.GET_MANY_APPROVAL_ITEMS_SUCCESS:
      return Object.assign({}, state, {data: payload, pending: false});

    case ApprovalItemsActionTypes.GET_MANY_APPROVAL_ITEMS_ERROR:
      return Object.assign({}, state, {pending: false, error: 'Error'});

    default:
      return state;
  }
}
