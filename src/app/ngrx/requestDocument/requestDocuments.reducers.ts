import { initialState } from '../initial.state';
import { RequestDocumentsActionTypes, RequestDocumentActionTypes } from './requestDocuments.actions';

export function RequestDocumentsReducers( state = initialState, { type, payload }) {
  switch (type) {
    case RequestDocumentsActionTypes.GET_REQUEST_DOCUMENTS:
    case RequestDocumentsActionTypes.UPLOAD_REQUEST_DOCUMENT:
    case RequestDocumentsActionTypes.SAVE_REQUEST_DOCUMENT:
    case RequestDocumentsActionTypes.MARK_REQUEST_DOCUMENT:
    case RequestDocumentsActionTypes.UNMARK_REQUEST_DOCUMENT:
    case RequestDocumentsActionTypes.DELETE_REQUEST_DOCUMENT:
      return Object.assign({}, state, {pending: true, error: null});

    case RequestDocumentsActionTypes.GET_REQUEST_DOCUMENTS_SUCCESS:
      return Object.assign({}, state, {data: payload, pending: false});

    case RequestDocumentsActionTypes.UPLOAD_REQUEST_DOCUMENT_SUCCESS:
      // console.log(payload);
      const listAfterUpload = [...state.data, payload];
      // console.log(listAfterUpload);
      return Object.assign({}, state, {data: listAfterUpload, pending: false});

    case RequestDocumentsActionTypes.SAVE_REQUEST_DOCUMENT_SUCCESS:
    case RequestDocumentsActionTypes.MARK_REQUEST_DOCUMENT_SUCCESS:
    case RequestDocumentsActionTypes.UNMARK_REQUEST_DOCUMENT_SUCCESS:
      // console.log(payload);
      const listAfterModified = state.data.map(requestDocument => {
        return requestDocument._id === payload._id ? Object.assign({}, requestDocument, payload) : requestDocument;
      });
      // console.log(listAfterModified);
      return Object.assign({}, state, {data: listAfterModified, pending: false});

    case RequestDocumentsActionTypes.DELETE_REQUEST_DOCUMENT_SUCCESS:
      // console.log(payload);
      const listAfterDeleted = state.data.filter(requestDocument => {
        return requestDocument._id !== payload._id;
      });
      // console.log(listAfterDeleted);
      return Object.assign({}, state, {data: listAfterDeleted, pending: false});

    case RequestDocumentsActionTypes.GET_REQUEST_DOCUMENTS_ERROR:
    case RequestDocumentsActionTypes.UPLOAD_REQUEST_DOCUMENT_ERROR:
    case RequestDocumentsActionTypes.SAVE_REQUEST_DOCUMENT_ERROR:
    case RequestDocumentsActionTypes.MARK_REQUEST_DOCUMENT_ERROR:
    case RequestDocumentsActionTypes.UNMARK_REQUEST_DOCUMENT_ERROR:
    case RequestDocumentsActionTypes.DELETE_REQUEST_DOCUMENT_ERROR:
      return Object.assign({}, state, {pending: false, error: 'Error'});

    default:
      return state;
  }
}

export function RequestDocumentReducers( state = initialState, { type, payload }) {
  switch (type) {
    case RequestDocumentActionTypes.GET_REQUEST_DOCUMENT:
    case RequestDocumentActionTypes.DOWNLOAD_REQUEST_DOCUMENT:
      return Object.assign({}, state, {pending: true, error: null});

    case RequestDocumentActionTypes.GET_REQUEST_DOCUMENT_SUCCESS:
    case RequestDocumentActionTypes.DOWNLOAD_REQUEST_DOCUMENT_SUCCESS:
      return Object.assign({}, state, {data: payload, pending: false});

    case RequestDocumentActionTypes.GET_REQUEST_DOCUMENT_ERROR:
    case RequestDocumentActionTypes.DOWNLOAD_REQUEST_DOCUMENT_ERROR:
      return Object.assign({}, state, {pending: false, error: 'Error'});

    default:
      return state;
  }
}
