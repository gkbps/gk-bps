const initialState = {
  data: [],
  pending: false,
  error: null
}

export enum ApprovalItemActionTypes {
  // ApprovalItems
  GET_APPROVAL_ITEMS = '[Approval Item] Get Approval Items',
  GET_APPROVAL_ITEMS_SUCCESS = '[Approval Item] Get Approval Items Success',
  GET_APPROVAL_ITEMS_ERROR = '[Approval Item] Get Approval Items Error',
}

// ApprovalItems
export function getApprovalItemsAction(filter, sort, first, rows) {
  // Return an action with type and payload
  return {
    type: ApprovalItemActionTypes.GET_APPROVAL_ITEMS,
    payload: {
    }
  }
}

export function approvalItemsReducer( state = initialState, { type, payload }) {
  switch (type) {
    case ApprovalItemActionTypes.GET_APPROVAL_ITEMS:
      return Object.assign({}, state, {pending: true, error: null});

    case ApprovalItemActionTypes.GET_APPROVAL_ITEMS_SUCCESS:
      return Object.assign({}, state, {data: payload, pending: false});

    case ApprovalItemActionTypes.GET_APPROVAL_ITEMS_ERROR:
      return Object.assign({}, state, {pending: false, error: 'Error'});

    default:
      return state;
  }
}
