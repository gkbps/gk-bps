export function requestFiles (state: any = [], {type, payload}) {
  switch (type) {
    case 'LOAD_REQUEST_FILES':
      return payload;

    case 'ADD_REQUEST_FILE':
      return [...state, payload];

    case 'RENAME_REQUEST_FILE':
      return state.map(requestFile => {
        return requestFile._id === payload._id ? Object.assign({}, requestFile, payload) : requestFile;
      });

    case 'MARK_REQUEST_FILE':
      return state.map(requestFile => {
        return requestFile._id === payload._id ? Object.assign({}, requestFile, payload) : requestFile;
      });

    case 'UNMARK_REQUEST_FILE':
      return state.map(requestFile => {
        return requestFile._id === payload._id ? Object.assign({}, requestFile, payload) : requestFile;
      });

    case 'DELETE_REQUEST_FILE':
      return state.filter(request => {
          return request._id !== payload._id;
      });

    default:
      return state;
  }
}
