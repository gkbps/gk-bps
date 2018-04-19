/**
 * REQUEST COMMENTS
 */

export enum RequestCommentsActionTypes {
  RESET_REQUEST_COMMENTS = '[Request Comment] Reset Request Comments',
  RESET_REQUEST_COMMENTS_SUCCESS = '[Request Comment] Reset Request Comments Success',
  RESET_REQUEST_COMMENTS_ERROR = '[Request Comment] Reset Request Comments Error',

  GET_REQUEST_COMMENTS = '[Request Comment] Get Many Request Comments',
  GET_REQUEST_COMMENTS_SUCCESS = '[Request Comment] Get Many Request Comments Success',
  GET_REQUEST_COMMENTS_ERROR = '[Request Comment] Get Many Request Comments Error',

  ADD_REQUEST_COMMENT = '[Request Comment] Add A Request Comment',
  ADD_REQUEST_COMMENT_SUCCESS = '[Request Comment] Add A Request Comment Success',
  ADD_REQUEST_COMMENT_ERROR = '[Request Comment] Add A Request Comment Error',
}

/**
* @function resetRequestCommentsAction
* get Request Comments
*/
export function resetRequestCommentsAction() {
  // Return an action with type and payload
  return {
    type: RequestCommentsActionTypes.RESET_REQUEST_COMMENTS,
    payload: {}
  };
}

/**
* @function getRequestCommentsAction
* get Request Comments
*/
export function getRequestCommentsAction(id, first, rows) {
  // Return an action with type and payload
  return {
    type: RequestCommentsActionTypes.GET_REQUEST_COMMENTS,
    payload: {
      id: id,
      first: first,
      rows: rows
    }
  };
}

/**
* @function addRequestCommentAction
* get Request Comments
*/
export function addRequestCommentAction(id, comment) {
  // Return an action with type and payload
  return {
    type: RequestCommentsActionTypes.ADD_REQUEST_COMMENT,
    payload: {
      id: id,
      comment: comment
    }
  };
}
