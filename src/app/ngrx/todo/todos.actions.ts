export enum TodosActionTypes {
  GET_TODOS = '[Todo] Get Todos',
  GET_TODOS_SUCCESS = '[Todo] Get Todos Success',
  GET_TODOS_ERROR = '[Todo] Get Todos Error'
}

export function getTodosAction() {
  return {
    type: TodosActionTypes.GET_TODOS
  };
}
