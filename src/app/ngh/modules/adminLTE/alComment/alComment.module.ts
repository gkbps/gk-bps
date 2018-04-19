import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';

import { TranslateModule } from '@ngx-translate/core';

import { AlCommentComponent } from './alComment.component';

@NgModule({
  declarations: [
    AlCommentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    
    InputTextareaModule,
    ButtonModule,

    TranslateModule,
  ],
  exports: [
    AlCommentComponent
  ],
})
export class AlCommentModule {
}
