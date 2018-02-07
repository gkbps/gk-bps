import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

import { HIndividualNav } from './hIndividualNav.component';

import { MenubarModule } from 'primeng/menubar';

@NgModule({
  declarations: [
    HIndividualNav
  ],
  imports: [
    CommonModule,
    // FormsModule,
    MenubarModule
  ],
  exports: [
    HIndividualNav
  ],
})
export class HIndividualNavModule {
}
