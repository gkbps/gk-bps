import { initialState } from '../initial.state';
import {
  GkClientsActionTypes,
  GkClientActionTypes,
  GkClientRequestActionTypes,
  GkClientDashboardsActionTypes,
  GkClientReportsSummaryActionTypes,
  GkClientReportsDetailActionTypes
} from './gkClients.actions';

export function GkClientsReducers( state = initialState, { type, payload }) {
  switch (type) {
    case GkClientsActionTypes.GET_MANY_GKCLIENTS:
      return Object.assign({}, state, {pending: true, error: null});

    case GkClientsActionTypes.GET_MANY_GKCLIENTS_SUCCESS:
      return Object.assign({}, state, {data: payload, pending: false});

    case GkClientsActionTypes.GET_MANY_GKCLIENTS_ERROR:
      return Object.assign({}, state, {pending: false, error: 'Error'});

    default:
      return state;
  }
}

export function GkClientReducers( state = initialState, { type, payload }) {
  switch (type) {
    case GkClientActionTypes.GET_GKCLIENT:
    case GkClientActionTypes.RESET_GKCLIENT:
    case GkClientActionTypes.ADD_GKCLIENT:
    case GkClientActionTypes.SAVE_GKCLIENT:
    case GkClientActionTypes.DISABLE_GKCLIENT:
    case GkClientActionTypes.ENABLE_GKCLIENT:
    case GkClientActionTypes.MARK_GKCLIENT:
    case GkClientActionTypes.UNMARK_GKCLIENT:
    case GkClientActionTypes.DELETE_GKCLIENT:
      return Object.assign({}, state, {pending: true, error: null});

    case GkClientActionTypes.GET_GKCLIENT_SUCCESS:
    case GkClientActionTypes.RESET_GKCLIENT_SUCCESS:
    case GkClientActionTypes.ADD_GKCLIENT_SUCCESS:
    case GkClientActionTypes.SAVE_GKCLIENT_SUCCESS:
    case GkClientActionTypes.DISABLE_GKCLIENT_SUCCESS:
    case GkClientActionTypes.ENABLE_GKCLIENT_SUCCESS:
    case GkClientActionTypes.MARK_GKCLIENT_SUCCESS:
    case GkClientActionTypes.UNMARK_GKCLIENT_SUCCESS:
    case GkClientActionTypes.DELETE_GKCLIENT_SUCCESS:
      return Object.assign({}, state, {data: payload, pending: false});

    case GkClientActionTypes.GET_GKCLIENT_ERROR:
    case GkClientActionTypes.ADD_GKCLIENT_ERROR:
    case GkClientActionTypes.SAVE_GKCLIENT_ERROR:
    case GkClientActionTypes.DISABLE_GKCLIENT_ERROR:
    case GkClientActionTypes.ENABLE_GKCLIENT_ERROR:
    case GkClientActionTypes.MARK_GKCLIENT_ERROR:
    case GkClientActionTypes.UNMARK_GKCLIENT_ERROR:
    case GkClientActionTypes.DELETE_GKCLIENT_ERROR:
      return Object.assign({}, state, {pending: false, error: 'Error'});

    default:
      return state;
  }
}

export function GkClientRequestReducers( state = initialState, { type, payload }) {
  switch (type) {
    case GkClientRequestActionTypes.GET_GKCLIENT_REQUEST:
    case GkClientRequestActionTypes.SAVE_GKCLIENT_REQUEST:
    case GkClientRequestActionTypes.POST_GKCLIENT_REQUEST:
    case GkClientRequestActionTypes.REVERT_GKCLIENT_REQUEST:
      return Object.assign({}, state, {pending: true, error: null});

    case GkClientRequestActionTypes.GET_GKCLIENT_REQUEST_SUCCESS:
    case GkClientRequestActionTypes.SAVE_GKCLIENT_REQUEST_SUCCESS:
    case GkClientRequestActionTypes.POST_GKCLIENT_REQUEST_SUCCESS:
    case GkClientRequestActionTypes.REVERT_GKCLIENT_REQUEST_SUCCESS:
      return Object.assign({}, state, {data: payload, pending: false});

    case GkClientRequestActionTypes.GET_GKCLIENT_REQUEST_ERROR:
    case GkClientRequestActionTypes.SAVE_GKCLIENT_REQUEST_ERROR:
    case GkClientRequestActionTypes.POST_GKCLIENT_REQUEST_ERROR:
    case GkClientRequestActionTypes.REVERT_GKCLIENT_REQUEST_ERROR:
      return Object.assign({}, state, {pending: false, error: 'Error'});

    default:
      return state;
  }
}

export function GkClientDashboardsReducers( state = initialState, { type, payload }) {
  switch (type) {
    case GkClientDashboardsActionTypes.GET_MANY_GKCLIENT_DASHBOARDS:
      return Object.assign({}, state, {pending: true, error: null});

    case GkClientDashboardsActionTypes.GET_MANY_GKCLIENT_DASHBOARDS_SUCCESS:
      return Object.assign({}, state, {data: payload, pending: false});

    case GkClientDashboardsActionTypes.GET_MANY_GKCLIENT_DASHBOARDS_ERROR:
      return Object.assign({}, state, {pending: false, error: 'Error'});

    default:
      return state;
  }
}

export function GkClientReportsSummaryReducers( state = initialState, { type, payload }) {
  switch (type) {
    case GkClientReportsSummaryActionTypes.GET_MANY_GKCLIENT_SUMMARY_REPORTS:
      return Object.assign({}, state, {pending: true, error: null});

    case GkClientReportsSummaryActionTypes.GET_MANY_GKCLIENT_SUMMARY_REPORTS_SUCCESS:
      return Object.assign({}, state, {data: payload, pending: false});

    case GkClientReportsSummaryActionTypes.GET_MANY_GKCLIENT_SUMMARY_REPORTS_ERROR:
      return Object.assign({}, state, {pending: false, error: 'Error'});

    default:
      return state;
  }
}

export function GkClientReportsDetailReducers( state = initialState, { type, payload }) {
  switch (type) {
    case GkClientReportsDetailActionTypes.GET_MANY_GKCLIENT_DETAIL_REPORTS:
      return Object.assign({}, state, {pending: true, error: null});

    case GkClientReportsDetailActionTypes.GET_MANY_GKCLIENT_DETAIL_REPORTS_SUCCESS:
      return Object.assign({}, state, {data: payload, pending: false});

    case GkClientReportsDetailActionTypes.GET_MANY_GKCLIENT_DETAIL_REPORTS_ERROR:
      return Object.assign({}, state, {pending: false, error: 'Error'});

    default:
      return state;
  }
}
