/**
 * REQUEST DOCUMENTS
 */

export enum RequestDocumentsActionTypes {
  GET_REQUEST_DOCUMENTS = '[Request Document] Get Many Request Documents',
  GET_REQUEST_DOCUMENTS_SUCCESS = '[Request Document] Get Many Request Documents Success',
  GET_REQUEST_DOCUMENTS_ERROR = '[Request Document] Get Many Request Documents Error',

  // Action on single Document that impact to the list
  UPLOAD_REQUEST_DOCUMENT = '[Request Document] Upload Request Document',
  UPLOAD_REQUEST_DOCUMENT_SUCCESS = '[Request] Upload Request Document Success',
  UPLOAD_REQUEST_DOCUMENT_ERROR = '[Request] Upload Request Document Error',

  SAVE_REQUEST_DOCUMENT = '[Request Document] Save Request Document',
  SAVE_REQUEST_DOCUMENT_SUCCESS = '[Request Document] Save Request Document Success',
  SAVE_REQUEST_DOCUMENT_ERROR = '[Request Document] Save Request Document Error',

  MARK_REQUEST_DOCUMENT = '[Request Document] Mark Request Document',
  MARK_REQUEST_DOCUMENT_SUCCESS = '[Request Document] Mark Request Document Success',
  MARK_REQUEST_DOCUMENT_ERROR = '[Request Document] Mark Request Document Error',

  UNMARK_REQUEST_DOCUMENT = '[Request Document] Unmark Request Document',
  UNMARK_REQUEST_DOCUMENT_SUCCESS = '[Request Document] Unmark Request Document Success',
  UNMARK_REQUEST_DOCUMENT_ERROR = '[Request Document] Unmark Request Document Error',

  DELETE_REQUEST_DOCUMENT = '[Request Document] Delete Request Document',
  DELETE_REQUEST_DOCUMENT_SUCCESS = '[Request Document] Delete Request Document Success',
  DELETE_REQUEST_DOCUMENT_ERROR = '[Request Document] Delete Request Document Error',
}

/**
* @function getRequestDocumentsAction
* get Request Documents
*/
export function getRequestDocumentsAction(id) {
  // Return an action with type and payload
  return {
    type: RequestDocumentsActionTypes.GET_REQUEST_DOCUMENTS,
    payload: {
      id: id
    }
  };
}

export function uploadRequestDocumentAction(id, formData) {
  return {
    type: RequestDocumentsActionTypes.UPLOAD_REQUEST_DOCUMENT,
    payload: {
      id: id,
      formData: formData
    }
  };
}

export function saveRequestDocumentAction(id, desc) {
  return {
    type: RequestDocumentsActionTypes.SAVE_REQUEST_DOCUMENT,
    payload: {
      id: id,
      desc: desc
    }
  };
}

export function markRequestDocumentAction(id) {
  return {
    type: RequestDocumentsActionTypes.MARK_REQUEST_DOCUMENT,
    payload: { id: id }
  };
}

export function unmarkRequestDocumentAction(id) {
  return {
    type: RequestDocumentsActionTypes.UNMARK_REQUEST_DOCUMENT,
    payload: { id: id }
  };
}

export function deleteRequestDocumentAction(id) {
  return {
    type: RequestDocumentsActionTypes.DELETE_REQUEST_DOCUMENT,
    payload: { id: id }
  };
}

/**
 * REQUEST DOCUMENT
 */

export enum RequestDocumentActionTypes {
  GET_REQUEST_DOCUMENT = '[Request Document] Get Request Document',
  GET_REQUEST_DOCUMENT_SUCCESS = '[Request Document] Get Request Document Success',
  GET_REQUEST_DOCUMENT_ERROR = '[Request Document] Get Request Document Error',

  DOWNLOAD_REQUEST_DOCUMENT = '[Request Document] Download Request Document',
  DOWNLOAD_REQUEST_DOCUMENT_SUCCESS = '[Request Document] Download Request Document Success',
  DOWNLOAD_REQUEST_DOCUMENT_ERROR = '[Request Document] Download Request Document Error',
}

export function getRequestDocumentAction(id) {
  return {
    type: RequestDocumentActionTypes.GET_REQUEST_DOCUMENT,
    payload: { id: id }
  };
}

export function downloadRequestDocumentAction(id, tcode) {
  return {
    type: RequestDocumentActionTypes.DOWNLOAD_REQUEST_DOCUMENT,
    payload: {
      id: id,
      tcode: tcode
    }
  };
}
