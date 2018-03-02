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
export function getRequestsAction(filter, sort, first, rows, tray) {
  // Return an action with type and payload
  return {
    type: RequestsActionTypes.GET_REQUESTS,
    payload: {
      filter: filter,
      sort: sort,
      first: first,
      rows: rows,
      tray: tray
    }
  }
}

/**
 * REQUEST
 */

export enum RequestActionTypes {
  GET_REQUEST = '[Request] Get Request',
  GET_REQUEST_SUCCESS = '[Request] Get Request Success',
  GET_REQUEST_ERROR = '[Request] Get Request Error',

  RESET_REQUEST ='[Request] Reset Request',
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
  REVERT_REQUEST_ERROR = '[Request] Revert Request Error'
}

export function getRequestAction(id) {
  return {
    type: RequestActionTypes.GET_REQUEST,
    payload: { id: id }
  }
}

export function resetRequestAction(tcode) {
  return {
    type: RequestActionTypes.RESET_REQUEST,
    payload: { tcode: tcode }
  }
}

export function addRequestAction(Request) {
  return {
    type: RequestActionTypes.ADD_REQUEST,
    payload: { data: Request }
  }
}

export function saveRequestAction(Request) {
  return {
    type: RequestActionTypes.SAVE_REQUEST,
    payload: { data: Request }
  }
}

export function submitRequestAction(Request) {
  return {
    type: RequestActionTypes.SUBMIT_REQUEST,
    payload: { data: Request }
  }
}

export function withdrawRequestAction(id) {
  return {
    type: RequestActionTypes.WITHDRAW_REQUEST,
    payload: { id: id }
  }
}

export function cancelRequestAction(id) {
  return {
    type: RequestActionTypes.CANCEL_REQUEST,
    payload: { id: id }
  }
}

export function returnRequestAction(id) {
  return {
    type: RequestActionTypes.RETURN_REQUEST,
    payload: { id: id }
  }
}

export function approveRequestAction(id, approverId, step) {
  return {
    type: RequestActionTypes.APPROVE_REQUEST,
    payload: {
      id: id,
      approverId: approverId,
      step: step
    }
  }
}

export function rejectRequestAction(id) {
  return {
    type: RequestActionTypes.REJECT_REQUEST,
    payload: { id: id }
  }
}

export function abortRequestAction(id) {
  return {
    type: RequestActionTypes.ABORT_REQUEST,
    payload: { id: id }
  }
}

export function postRequestAction(id) {
  return {
    type: RequestActionTypes.POST_REQUEST,
    payload: { id: id }
  }
}

export function revertRequestAction(id) {
  return {
    type: RequestActionTypes.REVERT_REQUEST,
    payload: { id: id }
  }
}
