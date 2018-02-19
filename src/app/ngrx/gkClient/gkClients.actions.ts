/*******************************************************************************
 * GKCLIENTS
 *******************************************************************************/

export enum GkClientsActionTypes {
  GET_GKCLIENTS = '[GkClient] Get GkClients',
  GET_GKCLIENTS_SUCCESS = '[GkClient] Get GkClients Success',
  GET_GKCLIENTS_ERROR = '[GkClient] Get GkClients Error'
}

// To get GkClients by pagination
export function getGkClientsAction(filter, sort, first, rows) {
  // Return an action with type and payload
  return {
    type: GkClientsActionTypes.GET_GKCLIENTS,    
    payload: {
      filter: filter,
      sort: sort,
      first: first,
      rows: rows
    }
  }
}

/*******************************************************************************
 * GKCLIENT
 *******************************************************************************/

export enum GkClientActionTypes {
  GET_GKCLIENT = '[GkClient] Get GkClient',
  GET_GKCLIENT_SUCCESS = '[GkClient] Get GkClient Success',
  GET_GKCLIENT_ERROR = '[GkClient] Get GkClient Error',

  RESET_GKCLIENT ='[GkClient] Reset GkClient',

  ADD_GKCLIENT = '[GkClient] Add GkClient',
  ADD_GKCLIENT_SUCCESS = '[GkClient] Add GkClient Success',
  ADD_GKCLIENT_ERROR = '[GkClient] Add GkClient Error',

  SAVE_GKCLIENT = '[GkClient] Save GkClient',
  SAVE_GKCLIENT_SUCCESS = '[GkClient] Save GkClient Success',
  SAVE_GKCLIENT_ERROR = '[GkClient] Save GkClient Error',

  ENABLE_GKCLIENT = '[GkClient] Enable GkClient',
  ENABLE_GKCLIENT_SUCCESS = '[GkClient] Enable GkClient Success',
  ENABLE_GKCLIENT_ERROR = '[GkClient] Enable GkClient Error',

  DISABLE_GKCLIENT = '[GkClient] Disable GkClient',
  DISABLE_GKCLIENT_SUCCESS = '[GkClient] Disable GkClient Success',
  DISABLE_GKCLIENT_ERROR = '[GkClient] Disable GkClient Error',

  MARK_GKCLIENT = '[GkClient] Mark GkClient',
  MARK_GKCLIENT_SUCCESS = '[GkClient] Mark GkClient Success',
  MARK_GKCLIENT_ERROR = '[GkClient] Mark GkClient Error',

  UNMARK_GKCLIENT = '[GkClient] Unmark GkClient',
  UNMARK_GKCLIENT_SUCCESS = '[GkClient] Unmark GkClient Success',
  UNMARK_GKCLIENT_ERROR = '[GkClient] Unmark GkClient Error',

  DELETE_GKCLIENT = '[GkClient] Delete GkClient',
  DELETE_GKCLIENT_SUCCESS = '[GkClient] Delete GkClient Success',
  DELETE_GKCLIENT_ERROR = '[GkClient] Delete GkClient Error',
}

export function getGkClientAction(id) {
  return {
    type: GkClientActionTypes.GET_GKCLIENT,
    payload: { id: id }
  }
}

export function resetGkClientAction() {
  return {
    type: GkClientActionTypes.RESET_GKCLIENT,
    payload: {}
  }
}

export function addGkClientAction(gkClient) {
  return {
    type: GkClientActionTypes.ADD_GKCLIENT,
    payload: { data: gkClient }
  }
}

export function saveGkClientAction(gkClient) {
  return {
    type: GkClientActionTypes.SAVE_GKCLIENT,
    payload: { data: gkClient }
  }
}

export function enableGkClientAction(id) {
  return {
    type: GkClientActionTypes.ENABLE_GKCLIENT,
    payload: { id: id }
  }
}

export function disableGkClientAction(id) {
  return {
    type: GkClientActionTypes.DISABLE_GKCLIENT,
    payload: { id: id }
  }
}

export function markGkClientAction(id) {
  return {
    type: GkClientActionTypes.MARK_GKCLIENT,
    payload: { id: id }
  }
}

export function unmarkGkClientAction(id) {
  return {
    type: GkClientActionTypes.UNMARK_GKCLIENT,
    payload: { id: id }
  }
}

export function deleteGkClientAction(id) {
  return {
    type: GkClientActionTypes.DELETE_GKCLIENT,
    payload: { id: id }
  }
}
