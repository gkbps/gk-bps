import { initialState } from '../initial.state';
import { GkClientsActionTypes, GkClientActionTypes } from './gkClients.actions';

export function GkClientsReducers( state = initialState, { type, payload }) {
  switch (type) {
    case GkClientsActionTypes.GET_GKCLIENTS:
      return Object.assign({}, state, {pending: true, error: null});

    case GkClientsActionTypes.GET_GKCLIENTS_SUCCESS:
      return Object.assign({}, state, {data: payload, pending: false});

    case GkClientsActionTypes.GET_GKCLIENTS_ERROR:
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
    case GkClientActionTypes.DELETE_GKCLIENT:
      return Object.assign({}, state, {pending: true, error: null});

    case GkClientActionTypes.GET_GKCLIENT_SUCCESS:
    case GkClientActionTypes.ADD_GKCLIENT_SUCCESS:
    case GkClientActionTypes.SAVE_GKCLIENT_SUCCESS:
    case GkClientActionTypes.DELETE_GKCLIENT_SUCCESS:
      return Object.assign({}, state, {data: payload, pending: false});

    case GkClientActionTypes.GET_GKCLIENT_ERROR:
    case GkClientActionTypes.ADD_GKCLIENT_ERROR:
    case GkClientActionTypes.SAVE_GKCLIENT_ERROR:
    case GkClientActionTypes.DELETE_GKCLIENT_ERROR:
      return Object.assign({}, state, {pending: false, error: 'Error'});

    default:
      return state;
  }
}
