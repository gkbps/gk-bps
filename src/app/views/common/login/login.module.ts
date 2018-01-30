// External
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Internal
import { AppTranslationModule } from '../../../app.translation.module';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    AppTranslationModule,
    LoginRoutingModule,
  ],
  declarations: [
    LoginComponent,
  ],
  providers: [
  ],
})
export class LoginModule {}
