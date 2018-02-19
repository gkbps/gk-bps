import { initialState } from '../initial.state';
import { TodosActionTypes } from './todos.actions';

export function TodosReducers( state = initialState, { type, payload }) {
  switch (type) {
    case TodosActionTypes.GET_TODOS:
      return Object.assign({}, state, {pending: true, error: null});

    case TodosActionTypes.GET_TODOS_SUCCESS:
      return Object.assign({}, state, {data: payload, pending: false});

    case TodosActionTypes.GET_TODOS_ERROR:
      return Object.assign({}, state, {pending: false, error: 'Error'});

    default:
      return state;
  }
}
