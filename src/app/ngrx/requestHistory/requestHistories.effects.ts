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

import { RequestHistoriesActionTypes } from './requestHistories.actions';
import { RequestHistoriesServices } from './requestHistories.services';

@Injectable()
export class RequestHistoriesEffects {
  constructor (
    private actions$: Actions,
    private requestHistoriesServices: RequestHistoriesServices
  ) {}

  /**
   * REQUESTS
   * @function resetRequestHistories$
   */

  @Effect() resetRequestHistories$ = this.actions$
    // Listen for the 'getRequests' action
    .pipe(
      ofType(RequestHistoriesActionTypes.RESET_REQUEST_HISTORIES),
      switchMap(action => {
        // console.log(action);
        return this.requestHistoriesServices.resetRequestHistories();
      }),
      // If successful, dispatch success action with result
      map(requestHistories => {
        // console.log(requestHistories);
        return ({ type: RequestHistoriesActionTypes.RESET_REQUEST_HISTORIES_SUCCESS, payload: requestHistories });
      })
    )
    // If request fails, dispatch failed action
    .catch(() => Observable.of({type: RequestHistoriesActionTypes.RESET_REQUEST_HISTORIES_ERROR}));

  /**
   * REQUESTS
   * @function getRequestHistories$
   */

  @Effect() getRequestHistories$ = this.actions$
    // Listen for the 'getRequests' action
    .pipe(
      ofType(RequestHistoriesActionTypes.GET_REQUEST_HISTORIES),
      switchMap(action => {
        // console.log(action);
        return this.requestHistoriesServices.action1x(
          action['payload']['id'],
          action['payload']['first'],
          action['payload']['rows']
        );
      }),
      // If successful, dispatch success action with result
      map(requestHistories => {
        // console.log(requestHistories);
        return ({ type: RequestHistoriesActionTypes.GET_REQUEST_HISTORIES_SUCCESS, payload: requestHistories });
      })
    )
    // If request fails, dispatch failed action
    .catch(() => Observable.of({type: RequestHistoriesActionTypes.GET_REQUEST_HISTORIES_ERROR}));

}
