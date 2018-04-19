import { initialState } from '../initial.state';
import { RequestCommentsActionTypes } from './requestComments.actions';

export function RequestCommentsReducers( state = initialState, { type, payload }) {
  switch (type) {
    case RequestCommentsActionTypes.RESET_REQUEST_COMMENTS:
    case RequestCommentsActionTypes.GET_REQUEST_COMMENTS:
    case RequestCommentsActionTypes.ADD_REQUEST_COMMENT:
      return Object.assign({}, state, {pending: true, error: null});

    case RequestCommentsActionTypes.RESET_REQUEST_COMMENTS_SUCCESS:
      return Object.assign({}, state, {data: payload, pending: false});

    case RequestCommentsActionTypes.GET_REQUEST_COMMENTS_SUCCESS:
      const modifiedPayload = state['data'].concat(payload);
      console.log(modifiedPayload);
      return Object.assign({}, state, {data: modifiedPayload, pending: false});

    case RequestCommentsActionTypes.ADD_REQUEST_COMMENT_SUCCESS:
      console.log(state);
      const blankPayload = [];
      const newPayload = blankPayload.concat(payload, state['data']);
      console.log(newPayload);
      return Object.assign({}, state, {data: newPayload, pending: false});

    case RequestCommentsActionTypes.RESET_REQUEST_COMMENTS_ERROR:  
    case RequestCommentsActionTypes.GET_REQUEST_COMMENTS_ERROR:
    case RequestCommentsActionTypes.ADD_REQUEST_COMMENT_ERROR:
      return Object.assign({}, state, {pending: false, error: 'Error'});

    default:
      return state;
  }
}
