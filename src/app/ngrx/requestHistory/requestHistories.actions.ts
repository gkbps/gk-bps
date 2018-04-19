/**
 * REQUEST HISTORIES
 */

export enum RequestHistoriesActionTypes {
  RESET_REQUEST_HISTORIES = '[Request History] Reset Request Histories',
  RESET_REQUEST_HISTORIES_SUCCESS = '[Request History] Reset Request Histories Success',
  RESET_REQUEST_HISTORIES_ERROR = '[Request History] Reset Request Histories Error',

  GET_REQUEST_HISTORIES = '[Request History] Get Many Request Histories',
  GET_REQUEST_HISTORIES_SUCCESS = '[Request History] Get Many Request Histories Success',
  GET_REQUEST_HISTORIES_ERROR = '[Request History] Get Many Request Histories Error',
}

/**
* @function resetRequestHistoriesAction
* get Request Histories
*/
export function resetRequestHistoriesAction() {
  // Return an action with type and payload
  return {
    type: RequestHistoriesActionTypes.RESET_REQUEST_HISTORIES,
    payload: { }
  };
}

/**
* @function getRequestHistoriesAction
* get Request Histories
*/
export function getRequestHistoriesAction(id, first, rows) {
  // Return an action with type and payload
  return {
    type: RequestHistoriesActionTypes.GET_REQUEST_HISTORIES,
    payload: {
      id: id,
      first: first,
      rows: rows
    }
  };
}
