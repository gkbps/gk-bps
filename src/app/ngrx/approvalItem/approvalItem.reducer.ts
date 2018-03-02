import { initialState } from '../initial.state';
import { ApprovalItemsActionTypes } from './approvalItems.actions';


// ApprovalItems
export function getApprovalItemsAction(filter, sort, first, rows) {
  // Return an action with type and payload
  return {
    type: ApprovalItemsActionTypes.GET_APPROVAL_ITEMS,
    payload: {
      filter: filter,
      sort: sort,
      first: first,
      rows: rows
    }
  }
}

export function approvalItemsReducer( state = initialState, { type, payload }) {
  switch (type) {
    case ApprovalItemsActionTypes.GET_APPROVAL_ITEMS:
      return Object.assign({}, state, {pending: true, error: null});

    case ApprovalItemsActionTypes.GET_APPROVAL_ITEMS_SUCCESS:
      return Object.assign({}, state, {data: payload, pending: false});

    case ApprovalItemsActionTypes.GET_APPROVAL_ITEMS_ERROR:
      return Object.assign({}, state, {pending: false, error: 'Error'});

    default:
      return state;
  }
}
