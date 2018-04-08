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

import { UsersActionTypes } from './users.actions';
import { UsersServices } from './user.service';

@Injectable()
export class UsersEffects {
  constructor (
    private actions$: Actions,
    private usersServices: UsersServices
  ) {}

  @Effect() getUsers$ = this.actions$
    // Listen for the 'getNotifications' action
    .pipe(
      ofType(UsersActionTypes.GET_MANY_USERS),
      switchMap(action => {
        // console.log(action);
        return this.usersServices.action1x(
          action['payload']['filter'],
          action['payload']['sort'],
          action['payload']['first'],
          action['payload']['rows']
        );
      }),
      // If successful, dispatch success action with result
      map(result => {
        // console.log(result);
        return ({ type: UsersActionTypes.GET_MANY_USERS_SUCCESS, payload: result });
      })
    )
    // If request fails, dispatch failed action
    .catch(() => Observable.of({type: UsersActionTypes.GET_MANY_USERS_ERROR}));

}
