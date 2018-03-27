/**
* GKCLIENTS
*/

export enum GkClientsActionTypes {
  GET_MANY_GKCLIENTS = '[GkClient] Get Many GkClients',
  GET_MANY_GKCLIENTS_SUCCESS = '[GkClient] Get Many GkClients Success',
  GET_MANY_GKCLIENTS_ERROR = '[GkClient] Get Many GkClients Error'
}

// To get GkClients by pagination
export function getGkClientsAction(filter, sort, first, rows) {
  // Return an action with type and payload
  return {
    type: GkClientsActionTypes.GET_MANY_GKCLIENTS,
    payload: {
      filter: filter,
      sort: sort,
      first: first,
      rows: rows
    }
  };
}

/**
* GKCLIENT
*/

export enum GkClientActionTypes {
  GET_GKCLIENT = '[GkClient] Get GkClient',
  GET_GKCLIENT_SUCCESS = '[GkClient] Get GkClient Success',
  GET_GKCLIENT_ERROR = '[GkClient] Get GkClient Error',

  RESET_GKCLIENT = '[GkClient] Reset GkClient',
  RESET_GKCLIENT_SUCCESS = '[GkClient] Reset GkClient Success',
  RESET_GKCLIENT_ERROR = '[GkClient] Reset GkClient Error',

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
  };
}

export function resetGkClientAction() {
  return {
    type: GkClientActionTypes.RESET_GKCLIENT,
    payload: {}
  };
}

export function addGkClientAction(gkClient) {
  return {
    type: GkClientActionTypes.ADD_GKCLIENT,
    payload: { data: gkClient }
  };
}

export function saveGkClientAction(gkClient) {
  return {
    type: GkClientActionTypes.SAVE_GKCLIENT,
    payload: { data: gkClient }
  };
}

export function enableGkClientAction(id) {
  return {
    type: GkClientActionTypes.ENABLE_GKCLIENT,
    payload: { id: id }
  };
}

export function disableGkClientAction(id) {
  return {
    type: GkClientActionTypes.DISABLE_GKCLIENT,
    payload: { id: id }
  };
}

export function markGkClientAction(id) {
  return {
    type: GkClientActionTypes.MARK_GKCLIENT,
    payload: { id: id }
  };
}

export function unmarkGkClientAction(id) {
  return {
    type: GkClientActionTypes.UNMARK_GKCLIENT,
    payload: { id: id }
  };
}

export function deleteGkClientAction(id) {
  return {
    type: GkClientActionTypes.DELETE_GKCLIENT,
    payload: { id: id }
  };
}

/**
* GKCLIENTREQUEST
*/

export enum GkClientRequestActionTypes {
  GET_GKCLIENT_REQUEST = '[GkClientRequest] Get GkClient Request',
  GET_GKCLIENT_REQUEST_SUCCESS = '[GkClientRequest] Get GkClient Request Success',
  GET_GKCLIENT_REQUEST_ERROR = '[GkClientRequest] Get GkClient Request Error',

  SAVE_GKCLIENT_REQUEST = '[GkClientRequest] Save GkClient Request',
  SAVE_GKCLIENT_REQUEST_SUCCESS = '[GkClientRequest] Save GkClient Request Success',
  SAVE_GKCLIENT_REQUEST_ERROR = '[GkClientRequest] Save GkClient Request Error',

  POST_GKCLIENT_REQUEST = '[GkClientRequest] Post GkClient Request',
  POST_GKCLIENT_REQUEST_SUCCESS = '[GkClientRequest] Post GkClient Request Success',
  POST_GKCLIENT_REQUEST_ERROR = '[GkClientRequest] Post GkClient Request Error',

  REVERT_GKCLIENT_REQUEST = '[GkClientRequest] Revert GkClient Request',
  REVERT_GKCLIENT_REQUEST_SUCCESS = '[GkClientRequest] Revert GkClient Request Success',
  REVERT_GKCLIENT_REQUEST_ERROR = '[GkClientRequest] Revert GkClient Request Error',
}

export function getGkClientRequestAction(id) {
  return {
    type: GkClientRequestActionTypes.GET_GKCLIENT_REQUEST,
    payload: { id: id }
  };
}

export function saveGkClientRequestAction(gkClientRequest) {
  return {
    type: GkClientRequestActionTypes.SAVE_GKCLIENT_REQUEST,
    payload: { data: gkClientRequest }
  };
}

export function postGkClientRequestAction(id) {
  return {
    type: GkClientRequestActionTypes.POST_GKCLIENT_REQUEST,
    payload: { id: id }
  };
}

export function revertGkClientRequestAction(id) {
  return {
    type: GkClientRequestActionTypes.REVERT_GKCLIENT_REQUEST,
    payload: { id: id }
  };
}

/**
* GKCLIENT DASHBOARDS
*/

export enum GkClientDashboardsActionTypes {
  GET_MANY_GKCLIENT_DASHBOARDS = '[GkClientDashboard] Get Many GkClient Dashboards',
  GET_MANY_GKCLIENT_DASHBOARDS_SUCCESS = '[GkClientDashboard] Get Many GkClient Dashboards Success',
  GET_MANY_GKCLIENT_DASHBOARDS_ERROR = '[GkClientDashboard] Get Many GkClient Dashboards Error'
}

// To get GkClient dashboards by pagination
export function getGkClientDashboardsAction(filter, sort, first, rows) {
  // Return an action with type and payload
  return {
    type: GkClientDashboardsActionTypes.GET_MANY_GKCLIENT_DASHBOARDS,
    payload: {
      filter: filter,
      sort: sort,
      first: first,
      rows: rows
    }
  };
}

/**
* GKCLIENT SUMMARY REPORTS
*/

export enum GkClientReportsSummaryActionTypes {
  GET_MANY_GKCLIENT_SUMMARY_REPORTS = '[GkClientSummaryReport] Get Many GkClient Summary Reports',
  GET_MANY_GKCLIENT_SUMMARY_REPORTS_SUCCESS = '[GkClientSummaryReport] Get Many GkClient Summary Reports Success',
  GET_MANY_GKCLIENT_SUMMARY_REPORTS_ERROR = '[GkClientSummaryReport] Get Many GkClient Summary Reports Error'
}

// To get GkClient dashboards by pagination
export function getGkClientReportsSummaryAction(filter, sort, first, rows) {
  // Return an action with type and payload
  return {
    type: GkClientReportsSummaryActionTypes.GET_MANY_GKCLIENT_SUMMARY_REPORTS,
    payload: {
      filter: filter,
      sort: sort,
      first: first,
      rows: rows
    }
  };
}

/**
* GKCLIENT DETAIL REPORTS
*/

export enum GkClientReportsDetailActionTypes {
  GET_MANY_GKCLIENT_DETAIL_REPORTS = '[GkClientDetailReport] Get Many GkClient Detail Reports',
  GET_MANY_GKCLIENT_DETAIL_REPORTS_SUCCESS = '[GkClientDetailReport] Get Many GkClient Detail Reports Success',
  GET_MANY_GKCLIENT_DETAIL_REPORTS_ERROR = '[GkClientDetailReport] Get Many GkClient Detail Reports Error'
}

// To get GkClient dashboards by pagination
export function getGkClientReportsDetailAction(filter, sort, first, rows) {
  // Return an action with type and payload
  return {
    type: GkClientReportsDetailActionTypes.GET_MANY_GKCLIENT_DETAIL_REPORTS,
    payload: {
      filter: filter,
      sort: sort,
      first: first,
      rows: rows
    }
  };
}
