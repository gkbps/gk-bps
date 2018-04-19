import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';

import { TranslateModule } from '@ngx-translate/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { RequestCommentsReducers } from '../../../../ngrx/requestComment/requestComments.reducers';
import { RequestCommentsEffects } from '../../../../ngrx/requestComment/requestComments.effects';
import { RequestCommentsServices } from '../../../../ngrx/requestComment/requestComments.services';

import { RequestCommentComponent } from './requestComment.component';

@NgModule({
  declarations: [
    RequestCommentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    InputTextareaModule,
    ButtonModule,

    TranslateModule,

    StoreModule.forFeature('requestComments', RequestCommentsReducers),
    EffectsModule.forFeature([
      RequestCommentsEffects
    ]),
  ],
  providers: [
    RequestCommentsServices
  ],
  exports: [
    RequestCommentComponent
  ],
})
export class RequestCommentModule {
}
