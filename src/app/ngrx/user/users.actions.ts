/**
* USER
* @enum {UsersActionTypes}
* @function getUsersAction
*/

export enum UsersActionTypes {
  // ApprovalItems
  GET_MANY_USERS = '[Users] Get Many Users',
  GET_MANY_USERS_SUCCESS = '[Users] Get Many Users Success',
  GET_MANY_USERS_ERROR = '[Users] Get Many Users Error',
}

export function getUsersAction(filter, sort, first, rows) {
  return {
    type: UsersActionTypes.GET_MANY_USERS,
    payload: {
      filter: filter,
      sort: sort,
      first: first,
      rows: rows
    }
  };
}
