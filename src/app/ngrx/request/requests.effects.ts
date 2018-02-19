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
import { Observable } from 'rxjs';
import { switchMap, map, concatMap } from 'rxjs/operators';

import { RequestsActionTypes, RequestActionTypes } from './requests.actions';
import { RequestsServices } from './requests.services';

@Injectable()
export class RequestsEffects {
  constructor (
    private actions$: Actions,
    private requestsServices: RequestsServices
  ) {}

  /* ------------------------------------------------------------------------
   * REQUESTS
   * ------------------------------------------------------------------------ */

  // Listen for the 'getRequests' action
  @Effect() getRequests$ = this.actions$
    .pipe(
      ofType(RequestsActionTypes.GET_REQUESTS),
      switchMap(action => {
        // console.log(action);
        return this.requestsServices.findMasterListPagination(
          action['payload']['filter'],
          action['payload']['sort'],
          action['payload']['first'],
          action['payload']['rows'],
          action['payload']['tray']
        )
      }),
      // If successful, dispatch success action with result
      map(requests =>{
        console.log(requests);
        return ({ type: RequestsActionTypes.GET_REQUESTS_SUCCESS, payload: requests });
      })
    )
    // If request fails, dispatch failed action
    .catch(() => Observable.of({type: RequestsActionTypes.GET_REQUESTS_ERROR}));

  /* ------------------------------------------------------------------------
   * REQUEST
   * ------------------------------------------------------------------------ */

  @Effect() getRequest$ = this.actions$
    .pipe(
      ofType(RequestActionTypes.GET_REQUEST),
      concatMap(action => {
        // console.log(action);
        return this.requestsServices.findById(action['payload']['id'])
      }),
      map(request => {
        console.log(request);
        return { type: RequestActionTypes.GET_REQUEST_SUCCESS, payload: request };
      })
    )
    .catch(() => Observable.of({type: RequestActionTypes.GET_REQUEST_ERROR}));

  @Effect() addRequest$ = this.actions$
    .pipe(
      ofType(RequestActionTypes.ADD_REQUEST),
      concatMap(action => {
        // console.log(action);
        return this.requestsServices.createNew(action['payload']['data'])
      }),
      map(request =>{
        // console.log(request);
        return { type: RequestActionTypes.ADD_REQUEST_SUCCESS, payload: request };
      })
    )
    .catch(() => Observable.of({type: RequestActionTypes.ADD_REQUEST_ERROR}));

  @Effect() saveRequest$ = this.actions$
  .pipe(
    ofType(RequestActionTypes.SAVE_REQUEST),
    concatMap(action => {
      // console.log(action);
      return this.requestsServices.update(action['payload']['data'])
    }),
    map(request =>{
      console.log(request);
      return { type: RequestActionTypes.SAVE_REQUEST_SUCCESS, payload: request };
    })
  )
  .catch(() => Observable.of({type: RequestActionTypes.SAVE_REQUEST_ERROR}));


  @Effect() enableRequest$ = this.actions$
    .pipe(
      ofType(RequestActionTypes.ENABLE_REQUEST),
      concatMap(action => {
        // console.log(action);
        return this.requestsServices.enable(action['payload']['id'])
      }),
      map(request =>{
        console.log(request);
        return { type: RequestActionTypes.ENABLE_REQUEST_SUCCESS, payload: request };
      })
    )
    .catch(() => Observable.of({type: RequestActionTypes.ENABLE_REQUEST_ERROR}));

  @Effect() disableRequest$ = this.actions$
    .pipe(
      ofType(RequestActionTypes.DISABLE_REQUEST),
      concatMap(action => {
        // console.log(action);
        return this.requestsServices.disable(action['payload']['id']);
      }),
      map(request =>{
        // console.log(request);
        return { type: RequestActionTypes.DISABLE_REQUEST_SUCCESS, payload: request };
      })
    )
    .catch(() => Observable.of({type: RequestActionTypes.DISABLE_REQUEST_ERROR}));

  @Effect() markRequest$ = this.actions$
    .pipe(
      ofType(RequestActionTypes.MARK_REQUEST),
      concatMap(action => {
        // console.log(action);
        return this.requestsServices.mark(action['payload']['id'])
      }),
      map(request =>{
        // console.log(request);
        return { type: RequestActionTypes.MARK_REQUEST_SUCCESS, payload: request };
      })
    )
    .catch(() => Observable.of({type: RequestActionTypes.MARK_REQUEST_ERROR}));

  @Effect() unmarkRequest$ = this.actions$
    .pipe(
      ofType(RequestActionTypes.UNMARK_REQUEST),
      concatMap(action => {
        // console.log(action);
        return this.requestsServices.unmark(action['payload']['id']);
      }),
      map(request =>{
        // console.log(request);
        return { type: RequestActionTypes.UNMARK_REQUEST_SUCCESS, payload: request };
      })
    )
    .catch(() => Observable.of({type: RequestActionTypes.UNMARK_REQUEST_ERROR}));

  @Effect() deleteRequest$ = this.actions$
    .pipe(
      ofType(RequestActionTypes.DELETE_REQUEST),
      concatMap(action => {
        // console.log(action);
        return this.requestsServices.delete(action['payload']['id']);
      }),
      map(request =>{
        // console.log(request);
        return { type: RequestActionTypes.DELETE_REQUEST_SUCCESS, payload: request };
      })
    )
    .catch(() => Observable.of({type: RequestActionTypes.DELETE_REQUEST_ERROR}));

}
