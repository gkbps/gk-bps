import { initialState } from '../initial.state';
import { UsersActionTypes } from './users.actions';

export function UsersReducers( state = initialState, { type, payload }) {
  switch (type) {
    case UsersActionTypes.GET_MANY_USERS:
      return Object.assign({}, state, {pending: true, error: null});

    case UsersActionTypes.GET_MANY_USERS_SUCCESS:
      return Object.assign({}, state, {data: payload, pending: false});

    case UsersActionTypes.GET_MANY_USERS_ERROR:
      return Object.assign({}, state, {pending: false, error: 'Error'});

    default:
      return state;
  }
}
