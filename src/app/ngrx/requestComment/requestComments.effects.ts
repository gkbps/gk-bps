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

import { RequestCommentsActionTypes } from './requestComments.actions';
import { RequestCommentsServices } from './requestComments.services';

@Injectable()
export class RequestCommentsEffects {
  constructor (
    private actions$: Actions,
    private requestCommentsServices: RequestCommentsServices
  ) {}

  /**
   * REQUEST COMMENTS
   * @function resetRequestComments$
   */
  @Effect() resetRequestComments$ = this.actions$
    // Listen for the 'getRequests' action
    .pipe(
      ofType(RequestCommentsActionTypes.RESET_REQUEST_COMMENTS),
      switchMap(action => {
        // console.log(action);
        return this.requestCommentsServices.resetRequestComments();
      }),
      // If successful, dispatch success action with result
      map(requestComments => {
        // console.log(requestComments);
        return ({ type: RequestCommentsActionTypes.RESET_REQUEST_COMMENTS_SUCCESS, payload: requestComments });
      })
    )
    // If request fails, dispatch failed action
    .catch(() => Observable.of({type: RequestCommentsActionTypes.RESET_REQUEST_COMMENTS_ERROR}));

  /**
   * REQUESTS
   * @function getRequestComments$
   */
  @Effect() getRequestComments$ = this.actions$
    // Listen for the 'getRequests' action
    .pipe(
      ofType(RequestCommentsActionTypes.GET_REQUEST_COMMENTS),
      switchMap(action => {
        // console.log(action);
        return this.requestCommentsServices.action1x(
          action['payload']['id'],
          action['payload']['first'],
          action['payload']['rows']
        );
      }),
      // If successful, dispatch success action with result
      map(requestComments => {
        // console.log(requestComments);
        return ({ type: RequestCommentsActionTypes.GET_REQUEST_COMMENTS_SUCCESS, payload: requestComments });
      })
    )
    // If request fails, dispatch failed action
    .catch(() => Observable.of({type: RequestCommentsActionTypes.GET_REQUEST_COMMENTS_ERROR}));

    /**
     * REQUEST
     * @function addRequestComment$
     */
    @Effect() addRequestComment$ = this.actions$
      .pipe(
        ofType(RequestCommentsActionTypes.ADD_REQUEST_COMMENT),
        switchMap(action => {
          // console.log(action);
          return this.requestCommentsServices.action11(
            action['payload']['id'],
            action['payload']['comment']
          );
        }),
        // If successful, dispatch success action with result
        map(requestComment => {
          console.log(requestComment);
          return ({ type: RequestCommentsActionTypes.ADD_REQUEST_COMMENT_SUCCESS, payload: requestComment });
        })
      )
      // If request fails, dispatch failed action
      .catch(() => Observable.of({type: RequestCommentsActionTypes.ADD_REQUEST_COMMENT_ERROR}));
}
