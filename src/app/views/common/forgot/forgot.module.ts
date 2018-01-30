// External
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Internal
import { AppTranslationModule } from '../../../app.translation.module';

import { ForgotRoutingModule } from './forgot-routing.module';
import { ForgotComponent } from './forgot.component';
// import { UserService } from '../../../services';
import { UserService } from '../../../nga/common/user.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    AppTranslationModule,
    ForgotRoutingModule,
  ],
  declarations: [
    ForgotComponent,
  ],
  providers: [
    UserService,
  ],
})
export class ForgotModule {}
