import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { switchMap, map, concatMap, catchError } from 'rxjs/operators';

import { RequestApprovalActionTypes } from './requestApproval.actions';
import { RequestApprovalServices } from './requestApproval.services';

@Injectable()
export class RequestApprovalEffects {
  constructor (
    private actions$: Actions,
    private requestApprovalServices: RequestApprovalServices
  ) {}

  // Listen for the 'getAll' action
  @Effect() getRequestApprovalByTcode$ = this.actions$
    .pipe(
      ofType(RequestApprovalActionTypes.GET_MANY_REQUEST_APPROVAL),
      switchMap(action => {
        console.log(action);

        return this.requestApprovalServices.findApprovalTypesByTcode(action['payload']['tcode'])
          .pipe(
            // If successful, dispatch success action with result
            map(requestApprovalItems => {
              console.log(requestApprovalItems);
              return ({type: RequestApprovalActionTypes.GET_MANY_REQUEST_APPROVAL_SUCCESS, payload: requestApprovalItems})
            }),
            // If request fails, dispatch failed action
            catchError((err, caught) => Observable.of({type: RequestApprovalActionTypes.GET_MANY_REQUEST_APPROVAL_ERROR}))
          )
      })
    );

}
