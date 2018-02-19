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

import { GkClientsActionTypes, GkClientActionTypes } from './gkClients.actions';
import { GkClientsServices } from './gkClients.services';

@Injectable()
export class GkClientsEffects {
  constructor (
    private actions$: Actions,
    private gkClientsServices: GkClientsServices
  ) {}

  /* ------------------------------------------------------------------------
   * GKCLIENTS
   * ------------------------------------------------------------------------ */

  // Listen for the 'getGkClients' action
  // @Effect() getGkClients$ = this.actions$
  //   .ofType(GkClientsActionTypes.GET_GKCLIENTS)
  //   .switchMap(action => {
  //     console.log(action);
  //     return this.gkClientsServices.findMasterListPagination(
  //       action['payload']['filter'],
  //       action['payload']['sort'],
  //       action['payload']['first'],
  //       action['payload']['rows']
  //     )
  //       // If successful, dispatch success action with result
  //       .map(gkClients =>{
  //         console.log(gkClients);
  //         return ({ type: GkClientsActionTypes.GET_GKCLIENTS_SUCCESS, payload: gkClients });
  //       })
  //
  //       // If request fails, dispatch failed action
  //       .catch(() => Observable.of({type: GkClientsActionTypes.GET_GKCLIENTS_ERROR}))
  //   });

    @Effect() getGkClients$ = this.actions$
      .pipe(
        ofType(GkClientsActionTypes.GET_GKCLIENTS),
        switchMap(action => {
          console.log(action);
          return this.gkClientsServices.findMasterListPagination(
            action['payload']['filter'],
            action['payload']['sort'],
            action['payload']['first'],
            action['payload']['rows']
          )}),
        // If successful, dispatch success action with result
        map(gkClients =>{
          console.log(gkClients);
          return ({ type: GkClientsActionTypes.GET_GKCLIENTS_SUCCESS, payload: gkClients });
        })
      )
      // If request fails, dispatch failed action
      .catch(() => Observable.of({type: GkClientsActionTypes.GET_GKCLIENTS_ERROR}));

  /* ------------------------------------------------------------------------
   * GKCLIENT
   * ------------------------------------------------------------------------ */

  @Effect() getGkClient$ = this.actions$
    .pipe(
      ofType(GkClientActionTypes.GET_GKCLIENT),
      concatMap(action => {
        // console.log(action);
        return (this.gkClientsServices.findById(action['payload']['id']));
      }),
      map(gkClient => {
        // console.log(gkClient);
        return ({ type: GkClientActionTypes.GET_GKCLIENT_SUCCESS, payload: gkClient });
      })
    )
    .catch(() => Observable.of({type: GkClientActionTypes.GET_GKCLIENT_ERROR}));

  @Effect() addGkClient$ = this.actions$
    .pipe(
      ofType(GkClientActionTypes.ADD_GKCLIENT),
      concatMap(action => {
        // console.log(action);
        return (this.gkClientsServices.createNew(action['payload']['data']));
      }),
      map(gkClient => {
        // console.log(gkClient);
        return ({ type: GkClientActionTypes.ADD_GKCLIENT_SUCCESS, payload: gkClient });
      })
    )
    .catch(() => Observable.of({type: GkClientActionTypes.ADD_GKCLIENT_ERROR}));

  @Effect() saveGkClient$ = this.actions$
    .pipe(
      ofType(GkClientActionTypes.SAVE_GKCLIENT),
      concatMap(action => {
        // console.log(action);
        return (this.gkClientsServices.update(action['payload']['data']));
      }),
      map(gkClient => {
        // console.log(gkClient);
        return ({ type: GkClientActionTypes.SAVE_GKCLIENT_SUCCESS, payload: gkClient });
      })
    )
    .catch(() => Observable.of({type: GkClientActionTypes.SAVE_GKCLIENT_ERROR}));

  @Effect() enableGkClient$ = this.actions$
    .pipe(
      ofType(GkClientActionTypes.ENABLE_GKCLIENT),
      concatMap(action => {
        // console.log(action);
        return (this.gkClientsServices.enable(action['payload']['id']));
      }),
      map(gkClient => {
        // console.log(gkClient);
        return ({ type: GkClientActionTypes.ENABLE_GKCLIENT_SUCCESS, payload: gkClient });
      })
    )
    .catch(() => Observable.of({type: GkClientActionTypes.ENABLE_GKCLIENT_ERROR}));

  @Effect() disableGkClient$ = this.actions$
    .pipe(
      ofType(GkClientActionTypes.DISABLE_GKCLIENT),
      concatMap(action => {
        // console.log(action);
        return (this.gkClientsServices.disable(action['payload']['id']));
      }),
      map(gkClient => {
        // console.log(gkClient);
        return ({ type: GkClientActionTypes.DISABLE_GKCLIENT_SUCCESS, payload: gkClient });
      })
    )
    .catch(() => Observable.of({type: GkClientActionTypes.DISABLE_GKCLIENT_ERROR}));

  @Effect() markGkClient$ = this.actions$
    .pipe(
      ofType(GkClientActionTypes.MARK_GKCLIENT),
      concatMap(action => {
        // console.log(action);
        return (this.gkClientsServices.mark(action['payload']['id']));
      }),
      map(gkClient => {
        // console.log(gkClient);
        return ({ type: GkClientActionTypes.MARK_GKCLIENT_SUCCESS, payload: gkClient });
      })
    )
    .catch(() => Observable.of({type: GkClientActionTypes.MARK_GKCLIENT_ERROR}));

  @Effect() unmarkGkClient$ = this.actions$
    .pipe(
      ofType(GkClientActionTypes.UNMARK_GKCLIENT),
      concatMap(action => {
        // console.log(action);
        return (this.gkClientsServices.unmark(action['payload']['id']));
      }),
      map(gkClient => {
        // console.log(gkClient);
        return ({ type: GkClientActionTypes.UNMARK_GKCLIENT_SUCCESS, payload: gkClient });
      })
    )
    .catch(() => Observable.of({type: GkClientActionTypes.UNMARK_GKCLIENT_ERROR}));

  @Effect() deleteGkClient$ = this.actions$
    .pipe(
      ofType(GkClientActionTypes.DELETE_GKCLIENT),
      concatMap(action => {
        // console.log(action);
        return (this.gkClientsServices.delete(action['payload']['id']));
      }),
      map(gkClient => {
        // console.log(gkClient);
        return ({ type: GkClientActionTypes.DELETE_GKCLIENT_SUCCESS, payload: gkClient });
      })
    )
    .catch(() => Observable.of({type: GkClientActionTypes.DELETE_GKCLIENT_ERROR}));

}
