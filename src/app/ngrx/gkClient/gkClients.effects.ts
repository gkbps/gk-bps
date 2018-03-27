/**
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

import {
  GkClientsActionTypes,
  GkClientActionTypes,
  GkClientRequestActionTypes,
  GkClientDashboardsActionTypes,
  GkClientReportsSummaryActionTypes,
  GkClientReportsDetailActionTypes,
} from './gkClients.actions';
import { GkClientsServices } from './gkClients.services';

@Injectable()
export class GkClientsEffects {
  constructor (
    private actions$: Actions,
    private gkClientsServices: GkClientsServices
  ) {}

  /**
  * GKCLIENTS
  */
  @Effect() getGkClients$ = this.actions$
    .pipe(
      ofType(GkClientsActionTypes.GET_MANY_GKCLIENTS),
      switchMap(action => {
        // console.log(action);
        return this.gkClientsServices.action1x(
          action['payload']['filter'],
          action['payload']['sort'],
          action['payload']['first'],
          action['payload']['rows']
        )
        .pipe(
          // If successful, dispatch success action with result
          map(gkClients => {
            // console.log(gkClients);
            return ({ type: GkClientsActionTypes.GET_MANY_GKCLIENTS_SUCCESS, payload: gkClients });
          }),
          // If request fails, dispatch failed action
          catchError((err, caught) => Observable.of({type: GkClientsActionTypes.GET_MANY_GKCLIENTS_ERROR}))
        );
      })
    );

  /**
  * GKCLIENT
  */

  @Effect() resetGkClient$ = this.actions$
    .pipe(
      ofType(GkClientActionTypes.RESET_GKCLIENT),
      switchMap(action => {
        console.log(action);
        return this.gkClientsServices.createBlankItem()
          .pipe(
            // If successful, dispatch success action with result
            map(gkClient => {
              console.log(gkClient);
              return ({ type: GkClientActionTypes.RESET_GKCLIENT_SUCCESS, payload: gkClient });
            }),
            // If request fails, dispatch failed action
            catchError((err, caught) => Observable.of({type: GkClientActionTypes.RESET_GKCLIENT_ERROR}))
          );
      })
    );

  @Effect() addGkClient$ = this.actions$
    .pipe(
      ofType(GkClientActionTypes.ADD_GKCLIENT),
      switchMap(action => {
        console.log(action);
        return this.gkClientsServices.action11(action['payload']['data'])
          .pipe(
            // If successful, dispatch success action with result
            map(gkClient => {
              console.log(gkClient);
              return ({ type: GkClientActionTypes.ADD_GKCLIENT_SUCCESS, payload: gkClient });
            }),
            // If request fails, dispatch failed action
            catchError((err, caught) => Observable.of({type: GkClientActionTypes.ADD_GKCLIENT_ERROR}))
          );
        })
      );

  @Effect() getGkClient$ = this.actions$
    .pipe(
      ofType(GkClientActionTypes.GET_GKCLIENT),
      switchMap(action => {
        console.log(action);
        return this.gkClientsServices.action12(action['payload']['id'])
          .pipe(
            // If successful, dispatch success action with result
            map(gkClient => {
              console.log(gkClient);
              return ({ type: GkClientActionTypes.GET_GKCLIENT_SUCCESS, payload: gkClient });
            }),
            // If request fails, dispatch failed action
            catchError((err, caught) => Observable.of({type: GkClientActionTypes.GET_GKCLIENT_ERROR}))
          );
      })
    );

  @Effect() saveGkClient$ = this.actions$
    .pipe(
      ofType(GkClientActionTypes.SAVE_GKCLIENT),
      switchMap(action => {
        console.log(action);
        return this.gkClientsServices.action13(action['payload']['data'])
          .pipe(
            map(gkClient => {
              // console.log(gkClient);
              return ({ type: GkClientActionTypes.SAVE_GKCLIENT_SUCCESS, payload: gkClient });
            }),
            catchError((err, caught) => Observable.of({type: GkClientActionTypes.SAVE_GKCLIENT_ERROR}))
          );
      })
    );

  @Effect() disableGkClient$ = this.actions$
    .pipe(
      ofType(GkClientActionTypes.DISABLE_GKCLIENT),
      concatMap(action => {
        // console.log(action);
        return this.gkClientsServices.action14(action['payload']['id'])
          .pipe(
            map(gkClient => {
              console.log(gkClient);
              return ({ type: GkClientActionTypes.DISABLE_GKCLIENT_SUCCESS, payload: gkClient });
            }),
            catchError((err, caught) => Observable.of({type: GkClientActionTypes.DISABLE_GKCLIENT_ERROR}))
          );
      })
    );

  @Effect() enableGkClient$ = this.actions$
    .pipe(
      ofType(GkClientActionTypes.ENABLE_GKCLIENT),
      concatMap(action => {
        // console.log(action);
        return this.gkClientsServices.action15(action['payload']['id'])
          .pipe(
            map(gkClient => {
              console.log(gkClient);
              return ({ type: GkClientActionTypes.ENABLE_GKCLIENT_SUCCESS, payload: gkClient });
            }),
            catchError((err, caught) => Observable.of({type: GkClientActionTypes.ENABLE_GKCLIENT_ERROR}))
          );
      })
    );

  @Effect() markGkClient$ = this.actions$
    .pipe(
      ofType(GkClientActionTypes.MARK_GKCLIENT),
      concatMap(action => {
        // console.log(action);
        return this.gkClientsServices.action16(action['payload']['id'])
          .pipe(
            map(gkClient => {
              console.log(gkClient);
              return ({ type: GkClientActionTypes.MARK_GKCLIENT_SUCCESS, payload: gkClient });
            }),
            catchError((err, caught) => Observable.of({type: GkClientActionTypes.MARK_GKCLIENT_ERROR}))
          );
      })
    );

  @Effect() unmarkGkClient$ = this.actions$
    .pipe(
      ofType(GkClientActionTypes.UNMARK_GKCLIENT),
      concatMap(action => {
        // console.log(action);
        return this.gkClientsServices.action17(action['payload']['id'])
          .pipe(
            map(gkClient => {
              console.log(gkClient);
              return ({ type: GkClientActionTypes.UNMARK_GKCLIENT_SUCCESS, payload: gkClient });
            }),
            catchError((err, caught) => Observable.of({type: GkClientActionTypes.UNMARK_GKCLIENT_ERROR}))
          );
      })
    );

  @Effect() deleteGkClient$ = this.actions$
    .pipe(
      ofType(GkClientActionTypes.DELETE_GKCLIENT),
      switchMap(action => {
        console.log(action);
        return this.gkClientsServices.action18(action['payload']['id'])
          .pipe(
            map(gkClient => {
              console.log(gkClient);
              return ({ type: GkClientActionTypes.DELETE_GKCLIENT_SUCCESS, payload: gkClient });
            }),
            catchError((err, caught) => Observable.of({type: GkClientActionTypes.DELETE_GKCLIENT_ERROR}))
          );
      })
    );

  /**
  * GKCLIENT REQUEST
  */

  @Effect() getGkClientRequest$ = this.actions$
    .pipe(
      ofType(GkClientRequestActionTypes.GET_GKCLIENT_REQUEST),
      switchMap(action => {
        console.log(action);
        return this.gkClientsServices.action32(action['payload']['id'])
          .pipe(
            map(moduleRequest => {
              console.log(moduleRequest);
              return ({ type: GkClientRequestActionTypes.GET_GKCLIENT_REQUEST_SUCCESS, payload: moduleRequest });
            }),
            catchError((err, caught) => Observable.of({type: GkClientRequestActionTypes.GET_GKCLIENT_REQUEST_ERROR}))
          );
      })
    );

  @Effect() saveGkClientRequest$ = this.actions$
    .pipe(
      ofType(GkClientRequestActionTypes.SAVE_GKCLIENT_REQUEST),
      switchMap(action => {
        console.log(action);
        return this.gkClientsServices.action33(action['payload']['data'])
          .pipe(
            map(moduleRequest => {
              console.log(moduleRequest);
              return ({ type: GkClientRequestActionTypes.SAVE_GKCLIENT_REQUEST_SUCCESS, payload: moduleRequest });
            }),
            catchError((err, caught) => Observable.of({type: GkClientRequestActionTypes.SAVE_GKCLIENT_REQUEST_ERROR}))
          );
      })
    );

  @Effect() postGkClientRequest$ = this.actions$
    .pipe(
      ofType(GkClientRequestActionTypes.POST_GKCLIENT_REQUEST),
      switchMap(action => {
        console.log(action);
        return this.gkClientsServices.action42(action['payload']['id'])
          .pipe(
            map(moduleRequest => {
              console.log(moduleRequest);
              return ({ type: GkClientRequestActionTypes.POST_GKCLIENT_REQUEST_SUCCESS, payload: moduleRequest });
            }),
            catchError((err, caught) => Observable.of({type: GkClientRequestActionTypes.POST_GKCLIENT_REQUEST_ERROR}))
          );
      })
    );

  @Effect() revertGkClientRequest$ = this.actions$
    .pipe(
      ofType(GkClientRequestActionTypes.REVERT_GKCLIENT_REQUEST),
      switchMap(action => {
        console.log(action);
        return this.gkClientsServices.action43(action['payload']['id'])
          .pipe(
            map(moduleRequest => {
              console.log(moduleRequest);
              return ({ type: GkClientRequestActionTypes.REVERT_GKCLIENT_REQUEST_SUCCESS, payload: moduleRequest });
            }),
            catchError((err, caught) => Observable.of({type: GkClientRequestActionTypes.REVERT_GKCLIENT_REQUEST_ERROR}))
          );
      })
    );

  /**
  * GKCLIENT DASHBOARDS
  */
  @Effect() getGkClientDashboards$ = this.actions$
    .pipe(
      ofType(GkClientDashboardsActionTypes.GET_MANY_GKCLIENT_DASHBOARDS),
      switchMap(action => {
        console.log(action);
        return this.gkClientsServices.action5x(
          action['payload']['filter'],
          action['payload']['sort'],
          action['payload']['first'],
          action['payload']['rows']
        )
        .pipe(
          // If successful, dispatch success action with result
          map(dashboards => {
            console.log(dashboards);
            return ({ type: GkClientDashboardsActionTypes.GET_MANY_GKCLIENT_DASHBOARDS_SUCCESS, payload: dashboards });
          }),
          // If request fails, dispatch failed action
          catchError((err, caught) => Observable.of({type: GkClientDashboardsActionTypes.GET_MANY_GKCLIENT_DASHBOARDS_ERROR}))
        );
      })
    );


  /**
  * GKCLIENT SUMMARY REPORTS
  */
  @Effect() getGkClientSummaryReports$ = this.actions$
    .pipe(
      ofType(GkClientReportsSummaryActionTypes.GET_MANY_GKCLIENT_SUMMARY_REPORTS),
      switchMap(action => {
        console.log(action);
        return this.gkClientsServices.action6x(
          action['payload']['filter'],
          action['payload']['sort'],
          action['payload']['first'],
          action['payload']['rows']
        )
        .pipe(
          // If successful, dispatch success action with result
          map(reports => {
            console.log(reports);
            return ({ type: GkClientReportsSummaryActionTypes.GET_MANY_GKCLIENT_SUMMARY_REPORTS_SUCCESS, payload: reports });
          }),
          // If request fails, dispatch failed action
          catchError((err, caught) => Observable.of({type: GkClientReportsSummaryActionTypes.GET_MANY_GKCLIENT_SUMMARY_REPORTS_ERROR}))
        );
      })
    );

  /**
  * GKCLIENT DETAIL REPORTS
  */
  @Effect() getGkClientDetailReports$ = this.actions$
    .pipe(
      ofType(GkClientReportsDetailActionTypes.GET_MANY_GKCLIENT_DETAIL_REPORTS),
      switchMap(action => {
        console.log(action);
        return this.gkClientsServices.action7x(
          action['payload']['filter'],
          action['payload']['sort'],
          action['payload']['first'],
          action['payload']['rows']
        )
        .pipe(
          // If successful, dispatch success action with result
          map(reports => {
            console.log(reports);
            return ({ type: GkClientReportsDetailActionTypes.GET_MANY_GKCLIENT_DETAIL_REPORTS_SUCCESS, payload: reports });
          }),
          // If request fails, dispatch failed action
          catchError((err, caught) => Observable.of({type: GkClientReportsDetailActionTypes.GET_MANY_GKCLIENT_DETAIL_REPORTS_ERROR}))
        );
      })
    );
}
