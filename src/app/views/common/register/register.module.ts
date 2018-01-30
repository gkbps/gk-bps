// External
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Internal
import { AppTranslationModule } from '../../../app.translation.module';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
// import { UserService } from '../../../services';
import { UserService } from '../../../nga/common/user.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    AppTranslationModule,
    RegisterRoutingModule,
  ],
  declarations: [
    RegisterComponent,
  ],
  providers: [
    UserService,
  ],
})
export class RegisterModule {}
