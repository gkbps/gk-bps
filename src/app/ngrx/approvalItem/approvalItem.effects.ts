import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';

import { ApprovalItemActionTypes } from './approvalItem.reducer';
import { ApprovalItemService } from './approvalItem.service';

@Injectable()
export class ApprovalItemEffects {
  constructor (
    private actions$: Actions,
    private approvalItemService: ApprovalItemService
  ) {}

  // Listen for the 'getAll' action
  @Effect() getAll$ = this.actions$
    .ofType(ApprovalItemActionTypes.GET_APPROVAL_ITEMS)
    .switchMap(action => {

      console.log(action);

      return this.approvalItemService.findStandardApprovalItems()
        // If successful, dispatch success action with result
        .map(standardApprovalItems =>({type: ApprovalItemActionTypes.GET_APPROVAL_ITEMS_SUCCESS, payload: standardApprovalItems}))
        // If request fails, dispatch failed action
        .catch(() => Observable.of({type: ApprovalItemActionTypes.GET_APPROVAL_ITEMS_ERROR}))
    });
}
