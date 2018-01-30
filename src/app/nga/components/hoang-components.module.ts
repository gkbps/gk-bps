import { NgModule, ModuleWithProviders } from '@angular/core';

import { HChangeDashboardModule } from './hChangeDashboard';
import { HContactFormModule } from './hContactForm';
import { HMapModule } from './hMap';
import { HMessageListModule } from './hMessageList';
import { HNavBoardModule } from './hNavBoard';

const HOANG_MODULES = [
  HChangeDashboardModule,
  HContactFormModule,
  HMapModule,
  HMessageListModule,
  HNavBoardModule
];

@NgModule({
  declarations: [
  ],
  imports: [
    ...HOANG_MODULES,
  ],
  exports: [
    ...HOANG_MODULES,
  ],
})
export class HoangModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: HoangModule,
    };
  }
}
