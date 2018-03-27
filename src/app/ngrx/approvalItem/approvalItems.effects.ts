import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { switchMap, map, concatMap, catchError } from 'rxjs/operators';

import { ApprovalItemsActionTypes } from './approvalItems.actions';
import { ApprovalItemsServices } from './approvalItems.services';

@Injectable()
export class ApprovalItemsEffects {
  constructor (
    private actions$: Actions,
    private approvalItemsServices: ApprovalItemsServices
  ) {}

  // Listen for the 'getAll' action
  @Effect() getAll$ = this.actions$
    .pipe(
      ofType(ApprovalItemsActionTypes.GET_MANY_APPROVAL_ITEMS),
      switchMap(action => {
        console.log(action);

        return this.approvalItemsServices.findStandardApprovalItems()
          .pipe(
            // If successful, dispatch success action with result
            map(standardApprovalItems => {
              console.log(standardApprovalItems);
              return ({type: ApprovalItemsActionTypes.GET_MANY_APPROVAL_ITEMS_SUCCESS, payload: standardApprovalItems});
            }),
            // If request fails, dispatch failed action
            catchError((err, caught) => Observable.of({type: ApprovalItemsActionTypes.GET_MANY_APPROVAL_ITEMS_ERROR}))
          );
      })
    );

}
