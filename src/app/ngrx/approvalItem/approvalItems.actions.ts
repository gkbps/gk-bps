/**
* APPROVALITEMS
*/

export enum ApprovalItemsActionTypes {
  // ApprovalItems
  GET_MANY_APPROVAL_ITEMS = '[Approval Item] Get Many Approval Items',
  GET_MANY_APPROVAL_ITEMS_SUCCESS = '[Approval Item] Get Many Approval Items Success',
  GET_MANY_APPROVAL_ITEMS_ERROR = '[Approval Item] Get Many Approval Items Error',
}

export function getApprovalItemsAction(prefix, filter, sort, first, rows) {
  return {
    type: ApprovalItemsActionTypes.GET_MANY_APPROVAL_ITEMS,
    payload: {
      prefix: prefix,
      filter: filter,
      sort: sort,
      first: first,
      rows: rows
    }
  };
}
