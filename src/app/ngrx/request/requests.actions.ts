/*******************************************************************************
 * REQUESTS
 *******************************************************************************/

export enum RequestsActionTypes {
  GET_REQUESTS = '[Request] Get Requests',
  GET_REQUESTS_SUCCESS = '[Request] Get Requests Success',
  GET_REQUESTS_ERROR = '[Request] Get Requests Error'
}

// To get Requests by pagination
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

/*******************************************************************************
 * REQUEST
 *******************************************************************************/

export enum RequestActionTypes {
  GET_REQUEST = '[Request] Get Request',
  GET_REQUEST_SUCCESS = '[Request] Get Request Success',
  GET_REQUEST_ERROR = '[Request] Get Request Error',

  RESET_REQUEST ='[Request] Reset Request',

  ADD_REQUEST = '[Request] Add Request',
  ADD_REQUEST_SUCCESS = '[Request] Add Request Success',
  ADD_REQUEST_ERROR = '[Request] Add Request Error',

  SAVE_REQUEST = '[Request] Save Request',
  SAVE_REQUEST_SUCCESS = '[Request] Save Request Success',
  SAVE_REQUEST_ERROR = '[Request] Save Request Error',

  ENABLE_REQUEST = '[Request] Enable Request',
  ENABLE_REQUEST_SUCCESS = '[Request] Enable Request Success',
  ENABLE_REQUEST_ERROR = '[Request] Enable Request Error',

  DISABLE_REQUEST = '[Request] Disable Request',
  DISABLE_REQUEST_SUCCESS = '[Request] Disable Request Success',
  DISABLE_REQUEST_ERROR = '[Request] Disable Request Error',

  MARK_REQUEST = '[Request] Mark Request',
  MARK_REQUEST_SUCCESS = '[Request] Mark Request Success',
  MARK_REQUEST_ERROR = '[Request] Mark Request Error',

  UNMARK_REQUEST = '[Request] Unmark Request',
  UNMARK_REQUEST_SUCCESS = '[Request] Unmark Request Success',
  UNMARK_REQUEST_ERROR = '[Request] Unmark Request Error',

  DELETE_REQUEST = '[Request] Delete Request',
  DELETE_REQUEST_SUCCESS = '[Request] Delete Request Success',
  DELETE_REQUEST_ERROR = '[Request] Delete Request Error',
}

export function getRequestAction(id) {
  return {
    type: RequestActionTypes.GET_REQUEST,
    payload: { id: id }
  }
}

export function resetRequestAction() {
  return {
    type: RequestActionTypes.RESET_REQUEST,
    payload: {}
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

export function enableRequestAction(id) {
  return {
    type: RequestActionTypes.ENABLE_REQUEST,
    payload: { id: id }
  }
}

export function disableRequestAction(id) {
  return {
    type: RequestActionTypes.DISABLE_REQUEST,
    payload: { id: id }
  }
}

export function markRequestAction(id) {
  return {
    type: RequestActionTypes.MARK_REQUEST,
    payload: { id: id }
  }
}

export function unmarkRequestAction(id) {
  return {
    type: RequestActionTypes.UNMARK_REQUEST,
    payload: { id: id }
  }
}

export function deleteRequestAction(id) {
  return {
    type: RequestActionTypes.DELETE_REQUEST,
    payload: { id: id }
  }
}
