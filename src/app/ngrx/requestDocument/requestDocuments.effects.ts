/***
 * EFFECTS contains the list of effects that
 * listen for the specific action (via ofType) from a smart component (via dispatching an action)
 * and map (via switchMap/ concatMap) a returned action (which include type and payload of action) with
 * a service to request data from API server then
 * dispatch the return to store (via map) or
 * catch an error to store (via catch)
 *
 * IMPORTANT: payload of action includes all parameters that are passed to service
 */

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { switchMap, map, concatMap, catchError } from 'rxjs/operators';

import { RequestDocumentsActionTypes, RequestDocumentActionTypes } from './requestDocuments.actions';
import { RequestDocumentsServices } from './requestDocuments.services';

@Injectable()
export class RequestDocumentsEffects {
  constructor (
    private actions$: Actions,
    private requestDocumentsServices: RequestDocumentsServices
  ) {}

  /**
   * REQUESTS
   * @function getRequests$
   *
   * @function uploadRequestDocument$
   * @function saveRequestDocument$
   * @function markRequestDocument$
   * @function unmarkRequestDocument$
   * @function deleteRequestDocument$
   */

  @Effect() getRequests$ = this.actions$
    // Listen for the 'getRequests' action
    .pipe(
      ofType(RequestDocumentsActionTypes.GET_REQUEST_DOCUMENTS),
      switchMap(action => {
        // console.log(action);
        return this.requestDocumentsServices.action1x(action['payload']['id']);
      }),
      // If successful, dispatch success action with result
      map(requestDocuments => {
        console.log(requestDocuments);
        return ({ type: RequestDocumentsActionTypes.GET_REQUEST_DOCUMENTS_SUCCESS, payload: requestDocuments });
      })
    )
    // If request fails, dispatch failed action
    .catch(() => Observable.of({type: RequestDocumentsActionTypes.GET_REQUEST_DOCUMENTS_ERROR}));

  @Effect() uploadRequestDocument$ = this.actions$
    .pipe(
      ofType(RequestDocumentsActionTypes.UPLOAD_REQUEST_DOCUMENT),
      switchMap(action => {
        console.log(action);
        return this.requestDocumentsServices.uploadRequestDocument(
          action['payload']['id'],
          action['payload']['formData'],
        )
          .pipe(
            map(requestDocument => {
              console.log(requestDocument);
              return { type: RequestDocumentsActionTypes.UPLOAD_REQUEST_DOCUMENT_SUCCESS, payload: requestDocument };
            }),
            catchError((err, caught) => Observable.of({type: RequestDocumentsActionTypes.UPLOAD_REQUEST_DOCUMENT_ERROR}))
          );
      })
    );

  @Effect() saveRequest$ = this.actions$
    .pipe(
      ofType(RequestDocumentsActionTypes.SAVE_REQUEST_DOCUMENT),
      switchMap(action => {
        console.log(action);
        return this.requestDocumentsServices.action13(
          action['payload']['id'],
          action['payload']['desc']
        )
          .pipe(
            map(requestDocument => {
              console.log(requestDocument);
              return { type: RequestDocumentsActionTypes.SAVE_REQUEST_DOCUMENT_SUCCESS, payload: requestDocument };
            }),
            catchError((err, caught) => Observable.of({type: RequestDocumentsActionTypes.SAVE_REQUEST_DOCUMENT_ERROR}))
          );
      })
    );

  @Effect() markRequest$ = this.actions$
    .pipe(
      ofType(RequestDocumentsActionTypes.MARK_REQUEST_DOCUMENT),
      switchMap(action => {
        console.log(action);
        return this.requestDocumentsServices.action16(action['payload']['id'])
          .pipe(
            map(requestDocument => {
              console.log(requestDocument);
              return { type: RequestDocumentsActionTypes.MARK_REQUEST_DOCUMENT_SUCCESS, payload: requestDocument };
            }),
            catchError((err, caught) => Observable.of({type: RequestDocumentsActionTypes.MARK_REQUEST_DOCUMENT_ERROR}))
          );
      })
    );

  @Effect() unmarkRequest$ = this.actions$
    .pipe(
      ofType(RequestDocumentsActionTypes.UNMARK_REQUEST_DOCUMENT),
      switchMap(action => {
        console.log(action);
        return this.requestDocumentsServices.action17(action['payload']['id'])
          .pipe(
            map(requestDocument => {
              console.log(requestDocument);
              return { type: RequestDocumentsActionTypes.UNMARK_REQUEST_DOCUMENT_SUCCESS, payload: requestDocument };
            }),
            catchError((err, caught) => Observable.of({type: RequestDocumentsActionTypes.UNMARK_REQUEST_DOCUMENT_ERROR}))
          );
      })
    );

  @Effect() deleteRequest$ = this.actions$
    .pipe(
      ofType(RequestDocumentsActionTypes.DELETE_REQUEST_DOCUMENT),
      switchMap(action => {
        console.log(action);
        return this.requestDocumentsServices.action18(action['payload']['id'])
          .pipe(
            map(requestDocument => {
              console.log(requestDocument);
              return { type: RequestDocumentsActionTypes.DELETE_REQUEST_DOCUMENT_SUCCESS, payload: requestDocument };
            }),
            catchError((err, caught) => Observable.of({type: RequestDocumentsActionTypes.DELETE_REQUEST_DOCUMENT_ERROR}))
          );
      })
    );
  /**
  * REQUEST OPERATIONS
  * @function getRequestDocument$
  * @function downloadRequestDocument$
  */

  @Effect() getRequestDocument$ = this.actions$
    .pipe(
      ofType(RequestDocumentActionTypes.GET_REQUEST_DOCUMENT),
      switchMap(action => {
        console.log(action);
        return this.requestDocumentsServices.action12(action['payload']['id'])
          .pipe(
            map(requestDocument => {
              console.log(requestDocument);
              return { type: RequestDocumentActionTypes.GET_REQUEST_DOCUMENT_SUCCESS, payload: requestDocument };
            }),
            catchError((err, caught) => Observable.of({type: RequestDocumentActionTypes.GET_REQUEST_DOCUMENT_ERROR}))
          );
      })
    );

  @Effect() downloadRequest$ = this.actions$
    .pipe(
      ofType(RequestDocumentActionTypes.DOWNLOAD_REQUEST_DOCUMENT),
      switchMap(action => {
        // console.log(action);
        return this.requestDocumentsServices.downloadRequestDocument(
          action['payload']['id'],
          action['payload']['tcode']
        )
          .pipe(
            map(requestDocument => {
              console.log(requestDocument);
              return { type: RequestDocumentActionTypes.DOWNLOAD_REQUEST_DOCUMENT_SUCCESS, payload: requestDocument };
            }),
            catchError((err, caught) => Observable.of({type: RequestDocumentActionTypes.DOWNLOAD_REQUEST_DOCUMENT_ERROR}))
          );
      })
    );

}
