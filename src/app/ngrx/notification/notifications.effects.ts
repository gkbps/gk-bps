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

import { TopNotificationsActionTypes, NotificationsActionTypes, NotificationActionTypes } from './notifications.actions';
import { NotificationsServices } from './notifications.services';

@Injectable()
export class NotificationsEffects {
  constructor (
    private actions$: Actions,
    private notificationsServices: NotificationsServices
  ) {}

  @Effect() getTopNotifications$ = this.actions$
    // Listen for the 'getNotifications' action
    .pipe(
      ofType(TopNotificationsActionTypes.GET_TOP_NOTIFICATIONS),
      switchMap(action => {
        // console.log(action);
        return this.notificationsServices.action1x(
          action['payload']['filter'],
          action['payload']['sort'],
          action['payload']['first'],
          action['payload']['rows']
        );
      }),
      // If successful, dispatch success action with result
      map(requestDocuments => {
        // console.log(requestDocuments);
        return ({ type: TopNotificationsActionTypes.GET_TOP_NOTIFICATIONS_SUCCESS, payload: requestDocuments });
      })
    )
    // If request fails, dispatch failed action
    .catch(() => Observable.of({type: TopNotificationsActionTypes.GET_TOP_NOTIFICATIONS_ERROR}));

  @Effect() addNotification$ = this.actions$
    // Listen for the 'getNotifications' action
    .pipe(
      ofType(TopNotificationsActionTypes.ADD_NOTIFICATION),
      // If successful, dispatch success action with result
      map(action => {
        console.log(action);
        return ({ type: TopNotificationsActionTypes.ADD_NOTIFICATION_SUCCESS, payload: action['payload']['notification'] });
      })
    )
    // If request fails, dispatch failed action
    .catch(() => Observable.of({type: TopNotificationsActionTypes.ADD_NOTIFICATION_ERROR}));

  /**
   * NOTIFICATIONS
   * @function getNotifications$
   *
   * @function uploadRequestDocument$
   * @function saveRequestDocument$
   * @function markRequestDocument$
   * @function unmarkRequestDocument$
   * @function deleteRequestDocument$
   */

  @Effect() getNotifications$ = this.actions$
    // Listen for the 'getNotifications' action
    .pipe(
      ofType(NotificationsActionTypes.GET_NOTIFICATIONS),
      switchMap(action => {
        // console.log(action);
        return this.notificationsServices.action1x(
          action['payload']['filter'],
          action['payload']['sort'],
          action['payload']['first'],
          action['payload']['rows']
        );
      }),
      // If successful, dispatch success action with result
      map(requestDocuments => {
        // console.log(requestDocuments);
        return ({ type: NotificationsActionTypes.GET_NOTIFICATIONS_SUCCESS, payload: requestDocuments });
      })
    )
    // If request fails, dispatch failed action
    .catch(() => Observable.of({type: NotificationsActionTypes.GET_NOTIFICATIONS_ERROR}));

  @Effect() markRequest$ = this.actions$
    .pipe(
      ofType(NotificationsActionTypes.MARK_NOTIFICATION),
      switchMap(action => {
        console.log(action);
        return this.notificationsServices.action16(action['payload']['id'])
          .pipe(
            map(requestDocument => {
              console.log(requestDocument);
              return { type: NotificationsActionTypes.MARK_NOTIFICATION_SUCCESS, payload: requestDocument };
            }),
            catchError((err, caught) => Observable.of({type: NotificationsActionTypes.MARK_NOTIFICATION_ERROR}))
          );
      })
    );

  @Effect() unmarkRequest$ = this.actions$
    .pipe(
      ofType(NotificationsActionTypes.UNMARK_NOTIFICATION),
      switchMap(action => {
        console.log(action);
        return this.notificationsServices.action17(action['payload']['id'])
          .pipe(
            map(requestDocument => {
              console.log(requestDocument);
              return { type: NotificationsActionTypes.UNMARK_NOTIFICATION_SUCCESS, payload: requestDocument };
            }),
            catchError((err, caught) => Observable.of({type: NotificationsActionTypes.UNMARK_NOTIFICATION_ERROR}))
          );
      })
    );

  @Effect() deleteRequest$ = this.actions$
    .pipe(
      ofType(NotificationsActionTypes.DELETE_NOTIFICATION),
      switchMap(action => {
        console.log(action);
        return this.notificationsServices.action18(action['payload']['id'])
          .pipe(
            map(requestDocument => {
              console.log(requestDocument);
              return { type: NotificationsActionTypes.DELETE_NOTIFICATION_SUCCESS, payload: requestDocument };
            }),
            catchError((err, caught) => Observable.of({type: NotificationsActionTypes.DELETE_NOTIFICATION_ERROR}))
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
      ofType(NotificationActionTypes.GET_NOTIFICATION),
      switchMap(action => {
        console.log(action);
        return this.notificationsServices.action12(action['payload']['id'])
          .pipe(
            map(requestDocument => {
              console.log(requestDocument);
              return { type: NotificationActionTypes.GET_NOTIFICATION_SUCCESS, payload: requestDocument };
            }),
            catchError((err, caught) => Observable.of({type: NotificationActionTypes.GET_NOTIFICATION_ERROR}))
          );
      })
    );

}
