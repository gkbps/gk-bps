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

import { RequestsActionTypes, RequestActionTypes } from './requests.actions';
import { RequestsServices } from './requests.services';

@Injectable()
export class RequestsEffects {
  constructor (
    private actions$: Actions,
    private requestsServices: RequestsServices
  ) {}

  /**
   * REQUESTS
   * @function getRequests$
   */

  @Effect() getRequests$ = this.actions$
    // Listen for the 'getRequests' action
    .pipe(
      ofType(RequestsActionTypes.GET_REQUESTS),
      switchMap(action => {
        // console.log(action);
        return this.requestsServices.action1x(
          action['payload']['filter'],
          action['payload']['sort'],
          action['payload']['first'],
          action['payload']['rows'],
          action['payload']['tray'],
          action['payload']['prefix']
        );
      }),
      // If successful, dispatch success action with result
      map(requests => {
        console.log(requests);
        return ({ type: RequestsActionTypes.GET_REQUESTS_SUCCESS, payload: requests });
      })
    )
    // If request fails, dispatch failed action
    .catch(() => Observable.of({type: RequestsActionTypes.GET_REQUESTS_ERROR}));

  /**
  * REQUEST OPERATIONS
  * @function getRequest$
  * @function resetRequest$
  * @function addRequest$
  * @function saveRequest$
  * @function submitRequest$
  * @function returnRequest$
  * @function approveRequest$
  * @function withdrawRequest$
  * @function cancelRequest$
  * @function rejectRequest$
  * @function abortRequest$
  * @function postRequest$
  * @function revertRequest$
  */

  @Effect() getRequest$ = this.actions$
    .pipe(
      ofType(RequestActionTypes.GET_REQUEST),
      switchMap(action => {
        console.log(action);
        return this.requestsServices.action12(action['payload']['id'])
          .pipe(
            map(request => {
              console.log(request);
              return { type: RequestActionTypes.GET_REQUEST_SUCCESS, payload: request };
            }),
            catchError((err, caught) => Observable.of({type: RequestActionTypes.GET_REQUEST_ERROR}))
          );
      })
    );

  @Effect() resetRequest$ = this.actions$
    .pipe(
      ofType(RequestActionTypes.RESET_REQUEST),
      switchMap(action => {
        console.log(action);
        return this.requestsServices.resetRequest(
          action['payload']['tcode'],
        )
          .pipe(
            map(request => {
              console.log(request);
              return { type: RequestActionTypes.RESET_REQUEST_SUCCESS, payload: request };
            }),
            catchError((err, caught) => Observable.of({type: RequestActionTypes.RESET_REQUEST_ERROR}))
          );
      })
    );

  @Effect() addRequest$ = this.actions$
    .pipe(
      ofType(RequestActionTypes.ADD_REQUEST),
      switchMap(action => {
        console.log(action);
        return this.requestsServices.action11(action['payload']['data'])
          .pipe(
            map(request => {
              console.log(request);
              return { type: RequestActionTypes.ADD_REQUEST_SUCCESS, payload: request };
            }),
            catchError((err, caught) => Observable.of({type: RequestActionTypes.ADD_REQUEST_ERROR}))
          );
      })
    );

  @Effect() saveRequest$ = this.actions$
    .pipe(
      ofType(RequestActionTypes.SAVE_REQUEST),
      switchMap(action => {
        console.log(action);
        return this.requestsServices.action13(action['payload']['data'])
          .pipe(
            map(request => {
              console.log(request);
              return { type: RequestActionTypes.SAVE_REQUEST_SUCCESS, payload: request };
            }),
            catchError((err, caught) => Observable.of({type: RequestActionTypes.SAVE_REQUEST_ERROR}))
          );
      })
    );

  @Effect() submitRequest$ = this.actions$
    .pipe(
      ofType(RequestActionTypes.SUBMIT_REQUEST),
      switchMap(action => {
        console.log(action);
        return this.requestsServices.submitRequest(action['payload']['data'])
          .pipe(
            map(request => {
              console.log(request);
              return { type: RequestActionTypes.SUBMIT_REQUEST_SUCCESS, payload: request };
            }),
            catchError((err, caught) => Observable.of({type: RequestActionTypes.SUBMIT_REQUEST_ERROR}))
          );
      })
    );

  @Effect() withdrawRequest$ = this.actions$
    .pipe(
      ofType(RequestActionTypes.WITHDRAW_REQUEST),
      switchMap(action => {
        console.log(action);
        return this.requestsServices.withdrawRequest(action['payload']['id'])
          .pipe(
            map(request => {
              console.log(request);
              return { type: RequestActionTypes.WITHDRAW_REQUEST_SUCCESS, payload: request };
            }),
            catchError((err, caught) => Observable.of({type: RequestActionTypes.WITHDRAW_REQUEST_ERROR}))
          );
      })
    );

  @Effect() cancelRequest$ = this.actions$
    .pipe(
      ofType(RequestActionTypes.CANCEL_REQUEST),
      switchMap(action => {
        console.log(action);
        return this.requestsServices.cancelRequest(action['payload']['id'])
          .pipe(
            map(request => {
              console.log(request);
              return { type: RequestActionTypes.CANCEL_REQUEST_SUCCESS, payload: request };
            }),
            catchError((err, caught) => Observable.of({type: RequestActionTypes.CANCEL_REQUEST_ERROR}))
          );
      })
    );

  @Effect() returnRequest$ = this.actions$
    .pipe(
      ofType(RequestActionTypes.RETURN_REQUEST),
      switchMap(action => {
        console.log(action);
        return this.requestsServices.returnRequest(action['payload']['id'])
          .pipe(
            map(request => {
              console.log(request);
              return { type: RequestActionTypes.RETURN_REQUEST_SUCCESS, payload: request };
            }),
            catchError((err, caught) => Observable.of({type: RequestActionTypes.RETURN_REQUEST_ERROR}))
          );
      })
    );

  @Effect() rejectRequest$ = this.actions$
    .pipe(
      ofType(RequestActionTypes.REJECT_REQUEST),
      switchMap(action => {
        console.log(action);
        return this.requestsServices.rejectRequest(action['payload']['id'])
          .pipe(
            map(request => {
              console.log(request);
              return { type: RequestActionTypes.REJECT_REQUEST_SUCCESS, payload: request };
            }),
            catchError((err, caught) => Observable.of({type: RequestActionTypes.REJECT_REQUEST_ERROR}))
          );
      })
    );

  @Effect() approveRequest$ = this.actions$
    .pipe(
      ofType(RequestActionTypes.APPROVE_REQUEST),
      switchMap(action => {
        console.log(action);
        return this.requestsServices.approveRequest(
          action['payload']['id'],
          action['payload']['approverId'],
          action['payload']['step'],
        )
        .pipe(
          map(request => {
            console.log(request);
            return { type: RequestActionTypes.APPROVE_REQUEST_SUCCESS, payload: request };
          }),
          catchError((err, caught) => Observable.of({type: RequestActionTypes.APPROVE_REQUEST_ERROR}))
        );
      })
    );

  @Effect() abortRequest$ = this.actions$
    .pipe(
      ofType(RequestActionTypes.ABORT_REQUEST),
      switchMap(action => {
        console.log(action);
        return this.requestsServices.abortRequest(action['payload']['id'])
          .pipe(
            map(request => {
              console.log(request);
              return { type: RequestActionTypes.ABORT_REQUEST_SUCCESS, payload: request };
            }),
            catchError((err, caught) => Observable.of({type: RequestActionTypes.ABORT_REQUEST_ERROR}))
          );
      })
    );

  /**
  * REQUEST - MANAGEMENT/ ACCOUNTING
  * @function postRequest$
  @ @function revertRequest$
  * @function createRequestJournal$
  * @function postRequestJournal$
  * @function revertRequestJournal$
  */

  @Effect() postRequest$ = this.actions$
    .pipe(
      ofType(RequestActionTypes.POST_REQUEST),
      switchMap(action => {
        console.log(action);
        return this.requestsServices.postRequest(action['payload']['id'])
          .pipe(
            map(request => {
              console.log(request);
              return { type: RequestActionTypes.POST_REQUEST_SUCCESS, payload: request };
            }),
            catchError((err, caught) => Observable.of({type: RequestActionTypes.POST_REQUEST_ERROR}))
          );
      })
    );

  @Effect() revertRequest$ = this.actions$
    .pipe(
      ofType(RequestActionTypes.REVERT_REQUEST),
      switchMap(action => {
        console.log(action);
        return this.requestsServices.revertRequest(action['payload']['id'])
          .pipe(
            map(request => {
              console.log(request);
              return { type: RequestActionTypes.REVERT_REQUEST_SUCCESS, payload: request };
            }),
            catchError((err, caught) => Observable.of({type: RequestActionTypes.REVERT_REQUEST_ERROR}))
          );
      })
    );

  @Effect() createRequestJournal$ = this.actions$
    .pipe(
      ofType(RequestActionTypes.CREATE_REQUEST_JOURNAL),
      switchMap(action => {
        console.log(action);
        return this.requestsServices.createRequestJournal(
          action['payload']['id'],
          action['payload']['journal']
        )
          .pipe(
            map(journal => {
              console.log(journal);
              return { type: RequestActionTypes.CREATE_REQUEST_JOURNAL_SUCCESS, payload: journal };
            }),
            catchError((err, caught) => Observable.of({type: RequestActionTypes.CREATE_REQUEST_JOURNAL_ERROR}))
          );
      })
    );

  @Effect() postRequestJournal$ = this.actions$
    .pipe(
      ofType(RequestActionTypes.POST_REQUEST_JOURNAL),
      switchMap(action => {
        console.log(action);
        return this.requestsServices.postRequestJournal(action['payload']['id'])
          .pipe(
            map(journal => {
              console.log(journal);
              return { type: RequestActionTypes.POST_REQUEST_JOURNAL_SUCCESS, payload: journal };
            }),
            catchError((err, caught) => Observable.of({type: RequestActionTypes.POST_REQUEST_JOURNAL_ERROR}))
          );
      })
    );

  @Effect() revertRequestJournal$ = this.actions$
    .pipe(
      ofType(RequestActionTypes.REVERT_REQUEST_JOURNAL),
      switchMap(action => {
        console.log(action);
        return this.requestsServices.revertRequestJournal(action['payload']['id'])
          .pipe(
            map(journal => {
              console.log(journal);
              return { type: RequestActionTypes.REVERT_REQUEST_JOURNAL_SUCCESS, payload: journal };
            }),
            catchError((err, caught) => Observable.of({type: RequestActionTypes.REVERT_REQUEST_JOURNAL_ERROR}))
          );
      })
    );

  /**
  * REQUEST - ADMINISTRATION
  * @function moveRequestApproval$
  * @function moveRequestStatus$
  */

  @Effect() moveRequestApproval$ = this.actions$
    .pipe(
      ofType(RequestActionTypes.MOVE_REQUEST_APPROVAL),
      switchMap(action => {
        console.log(action);
        return this.requestsServices.moveRequestApproval(
          action['payload']['id'],
          action['payload']['approval']
        )
          .pipe(
            map(request => {
              console.log(request);
              return { type: RequestActionTypes.MOVE_REQUEST_APPROVAL_SUCCESS, payload: request };
            }),
            catchError((err, caught) => Observable.of({type: RequestActionTypes.MOVE_REQUEST_APPROVAL_ERROR}))
          );
      })
    );

  @Effect() moveRequestStatus$ = this.actions$
    .pipe(
      ofType(RequestActionTypes.MOVE_REQUEST_STATUS),
      switchMap(action => {
        console.log(action);
        return this.requestsServices.moveRequestStatus(
          action['payload']['id'],
          action['payload']['status']
        )
          .pipe(
            map(request => {
              console.log(request);
              return { type: RequestActionTypes.MOVE_REQUEST_STATUS_SUCCESS, payload: request };
            }),
            catchError((err, caught) => Observable.of({type: RequestActionTypes.MOVE_REQUEST_STATUS_ERROR}))
          );
      })
    );
}
