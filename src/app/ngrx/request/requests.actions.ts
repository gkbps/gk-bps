/**
 * REQUESTS
 */

export enum RequestsActionTypes {
  GET_REQUESTS = '[Request] Get Many Requests',
  GET_REQUESTS_SUCCESS = '[Request] Get Many Requests Success',
  GET_REQUESTS_ERROR = '[Request] Get Many Requests Error'
}

/**
* @function getRequestsAction
* get Requests by pagination
*/
export function getRequestsAction(filter, sort, first, rows, tray, prefix = '') {
  // Return an action with type and payload
  return {
    type: RequestsActionTypes.GET_REQUESTS,
    payload: {
      filter: filter,
      sort: sort,
      first: first,
      rows: rows,
      tray: tray,
      prefix: prefix
    }
  };
}

/**
 * REQUEST
 */

export enum RequestActionTypes {
  GET_REQUEST = '[Request] Get Request',
  GET_REQUEST_SUCCESS = '[Request] Get Request Success',
  GET_REQUEST_ERROR = '[Request] Get Request Error',

  RESET_REQUEST = '[Request] Reset Request',
  RESET_REQUEST_SUCCESS = '[Request] Reset Request Success',
  RESET_REQUEST_ERROR = '[Request] Reset Request Error',

  ADD_REQUEST = '[Request] Add Request',
  ADD_REQUEST_SUCCESS = '[Request] Add Request Success',
  ADD_REQUEST_ERROR = '[Request] Add Request Error',

  SAVE_REQUEST = '[Request] Save Request',
  SAVE_REQUEST_SUCCESS = '[Request] Save Request Success',
  SAVE_REQUEST_ERROR = '[Request] Save Request Error',

  SUBMIT_REQUEST = '[Request] Submit Request',
  SUBMIT_REQUEST_SUCCESS = '[Request] Submit Request Success',
  SUBMIT_REQUEST_ERROR = '[Request] Submit Request Error',

  WITHDRAW_REQUEST = '[Request] Withdraw Request',
  WITHDRAW_REQUEST_SUCCESS = '[Request] Withdraw Request Success',
  WITHDRAW_REQUEST_ERROR = '[Request] Withdraw Request Error',

  CANCEL_REQUEST = '[Request] Cancel Request',
  CANCEL_REQUEST_SUCCESS = '[Request] Cancel Request Success',
  CANCEL_REQUEST_ERROR = '[Request] Cancel Request Error',

  RETURN_REQUEST = '[Request] Return Request',
  RETURN_REQUEST_SUCCESS = '[Request] Return Request Success',
  RETURN_REQUEST_ERROR = '[Request] Return Request Error',

  APPROVE_REQUEST = '[Request] Approve Request',
  APPROVE_REQUEST_SUCCESS = '[Request] Approve Request Success',
  APPROVE_REQUEST_ERROR = '[Request] Approve Request Error',

  REJECT_REQUEST = '[Request] Reject Request',
  REJECT_REQUEST_SUCCESS = '[Request] Reject Request Success',
  REJECT_REQUEST_ERROR = '[Request] Reject Request Error',

  ABORT_REQUEST = '[Request] Abort Request',
  ABORT_REQUEST_SUCCESS = '[Request] Abort Request Success',
  ABORT_REQUEST_ERROR = '[Request] Abort Request Error',

  POST_REQUEST = '[Request] Post Request',
  POST_REQUEST_SUCCESS = '[Request] Post Request Success',
  POST_REQUEST_ERROR = '[Request] Post Request Error',

  REVERT_REQUEST = '[Request] Revert Request',
  REVERT_REQUEST_SUCCESS = '[Request] Revert Request Success',
  REVERT_REQUEST_ERROR = '[Request] Revert Request Error',

  CREATE_REQUEST_JOURNAL = '[Request] Post Request Journal',
  CREATE_REQUEST_JOURNAL_SUCCESS = '[Request] Post Request Journal Success',
  CREATE_REQUEST_JOURNAL_ERROR = '[Request] Post Request Journal Error',

  POST_REQUEST_JOURNAL = '[Request] Post Request Journal',
  POST_REQUEST_JOURNAL_SUCCESS = '[Request] Post Request Journal Success',
  POST_REQUEST_JOURNAL_ERROR = '[Request] Post Request Journal Error',

  REVERT_REQUEST_JOURNAL = '[Request] Revert Request Journal',
  REVERT_REQUEST_JOURNAL_SUCCESS = '[Request] Revert Request Journal Success',
  REVERT_REQUEST_JOURNAL_ERROR = '[Request] Revert Request Journal Error',

  MOVE_REQUEST_APPROVAL = '[Request] Move Request Approval',
  MOVE_REQUEST_APPROVAL_SUCCESS = '[Request] Move Request Approval Success',
  MOVE_REQUEST_APPROVAL_ERROR = '[Request] Move Request Approval Error',

  MOVE_REQUEST_STATUS = '[Request] Move Request Status',
  MOVE_REQUEST_STATUS_SUCCESS = '[Request] Move Request Status Success',
  MOVE_REQUEST_STATUS_ERROR = '[Request] Move Request Status Error',

  GENERATE_REQUEST_APPROVAL = '[Request] Generate Request Approval',
  GENERATE_REQUEST_APPROVAL_SUCCESS = '[Request] Generate Request Approval Success',
  GENERATE_REQUEST_APPROVAL_ERROR = '[Request] Generate Request Approval Error',

  INSERT_APPROVER_BEFORE = '[Request] Insert Approver (Before)',
  INSERT_APPROVER_BEFORE_SUCCESS = '[Request] Insert Approver (Before) Success',
  INSERT_APPROVER_BEFORE_ERROR = '[Request] Insert Approver (Before) Error',

  INSERT_APPROVER_AFTER = '[Request] Insert Approver (After)',
  INSERT_APPROVER_AFTER_SUCCESS = '[Request] Insert Approver (After) Success',
  INSERT_APPROVER_AFTER_ERROR = '[Request] Insert Approver (After) Error',

  REMOVE_APPROVER = '[Request] Remove Approver',
  REMOVE_APPROVER_SUCCESS = '[Request] Remove Approver Success',
  REMOVE_APPROVER_ERROR = '[Request] Remove Approver Error',
}

export function getRequestAction(id) {
  return {
    type: RequestActionTypes.GET_REQUEST,
    payload: { id: id }
  };
}

export function resetRequestAction(tcode) {
  return {
    type: RequestActionTypes.RESET_REQUEST,
    payload: { tcode: tcode }
  };
}

export function addRequestAction(Request, tcode) {
  return {
    type: RequestActionTypes.ADD_REQUEST,
    payload: {
      data: Request,
      tcode: tcode
    }
  };
}

export function saveRequestAction(Request) {
  return {
    type: RequestActionTypes.SAVE_REQUEST,
    payload: { data: Request }
  };
}

export function submitRequestAction(Request) {
  return {
    type: RequestActionTypes.SUBMIT_REQUEST,
    payload: { data: Request }
  };
}

export function withdrawRequestAction(id) {
  return {
    type: RequestActionTypes.WITHDRAW_REQUEST,
    payload: { id: id }
  };
}

export function cancelRequestAction(id) {
  return {
    type: RequestActionTypes.CANCEL_REQUEST,
    payload: { id: id }
  };
}

export function returnRequestAction(id) {
  return {
    type: RequestActionTypes.RETURN_REQUEST,
    payload: { id: id }
  };
}

export function approveRequestAction(id, approverId, step) {
  return {
    type: RequestActionTypes.APPROVE_REQUEST,
    payload: {
      id: id,
      approverId: approverId,
      step: step
    }
  };
}

export function rejectRequestAction(id) {
  return {
    type: RequestActionTypes.REJECT_REQUEST,
    payload: { id: id }
  };
}

export function abortRequestAction(id) {
  return {
    type: RequestActionTypes.ABORT_REQUEST,
    payload: { id: id }
  };
}

export function postRequestAction(id) {
  return {
    type: RequestActionTypes.POST_REQUEST,
    payload: { id: id }
  };
}

export function revertRequestAction(id) {
  return {
    type: RequestActionTypes.REVERT_REQUEST,
    payload: { id: id }
  };
}

export function createRequestJournalAction(id, journal) {
  return {
    type: RequestActionTypes.POST_REQUEST_JOURNAL,
    payload: {
      id: id,
      journal: journal
    }
  };
}

export function postRequestJournalAction(id) {
  return {
    type: RequestActionTypes.POST_REQUEST_JOURNAL,
    payload: { id: id }
  };
}

export function revertRequestJournalAction(id) {
  return {
    type: RequestActionTypes.REVERT_REQUEST_JOURNAL,
    payload: { id: id }
  };
}

export function moveRequestApprovalAction(id, approval) {
  return {
    type: RequestActionTypes.MOVE_REQUEST_APPROVAL,
    payload: {
      id: id,
      approval: approval
    }
  };
}

export function moveRequestStatusAction(id, status) {
  return {
    type: RequestActionTypes.REVERT_REQUEST_JOURNAL,
    payload: {
      id: id,
      status: status
    }
  };
}

export function generateRequestApprovalAction(id) {
  return {
    type: RequestActionTypes.GENERATE_REQUEST_APPROVAL,
    payload: {
      id: id
    }
  };
}

export function insertApproverBeforeAction(id, insertedApproval) {
  return {
    type: RequestActionTypes.INSERT_APPROVER_BEFORE,
    payload: {
      id: id,
      approval: insertedApproval
    }
  };
}

export function insertApproverAfterAction(id, insertedApproval) {
  return {
    type: RequestActionTypes.INSERT_APPROVER_AFTER,
    payload: {
      id: id,
      approval: insertedApproval
    }
  };
}

export function removeApproverAction(id, sequence) {
  return {
    type: RequestActionTypes.REMOVE_APPROVER,
    payload: {
      id: id,
      sequence: sequence
    }
  };
}
