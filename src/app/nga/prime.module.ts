import { NgModule, ModuleWithProviders } from '@angular/core';

// PRIME MODULES
import {
  SharedModule,

  // Input
  DropdownModule,
  MultiSelectModule,
  ChipsModule,
  AutoCompleteModule,
  InputTextModule,
  InputMaskModule,
  PasswordModule,
  InputTextareaModule,
  EditorModule,

  CheckboxModule,
  RadioButtonModule,
  InputSwitchModule,
  TriStateCheckboxModule,
  // RatingModule,

  // Advance input
  CalendarModule,
  // ColorPickerModule,
  ListboxModule,
  // SliderModule,
  // SpinnerModule,
  // ProgressBarModule,
  // InplaceModule,

  // Button
  // ToggleButtonModule,
  SelectButtonModule,
  ButtonModule,
  SplitButtonModule,

  // Data presentation
  // CarouselModule,
  DataTableModule,
  DataGridModule,
  DataListModule,
  DataScrollerModule,
  // GMapModule,
  OrderListModule,
  OrganizationChartModule,
  PaginatorModule,
  PickListModule,
  ScheduleModule,
  TreeModule,
  TreeTableModule,
  // TreeNode,
  // GalleriaModule,

  // Grouping
  AccordionModule,
  FieldsetModule,
  PanelModule,
  TabViewModule,
  ToolbarModule,
  BreadcrumbModule,

  // Menu
  ContextMenuModule,
  // MenuItem,
  // MegaMenuModule,
  MenuModule,
  MenubarModule,
  PanelMenuModule,
  // SlideMenuModule,
  // StepsModule,
  TabMenuModule,
  // TieredMenuModule,

  // Dialog
  DialogModule,
  ConfirmDialogModule,
  // LightboxModule,
  OverlayPanelModule,
  TooltipModule,
  BlockUIModule,

  FileUploadModule,

  ChartModule,

  GrowlModule,
  MessagesModule,

  // Advance
  DragDropModule,
  // CaptchaModule,
  // CodeHighlighterModule,
  // DeferModule,
  TerminalModule,
//
} from 'primeng/primeng';

const PRIMENG_MODULES = [
  SharedModule,

  // Input
  DropdownModule,
  MultiSelectModule,
  ChipsModule,
  AutoCompleteModule,
  InputTextModule,
  InputMaskModule,
  PasswordModule,
  InputTextareaModule,
  EditorModule,

  CheckboxModule,
  RadioButtonModule,
  InputSwitchModule,
  TriStateCheckboxModule,
  // RatingModule,

  // Advance input
  CalendarModule,
  // ColorPickerModule,
  ListboxModule,
  // SliderModule,
  // SpinnerModule,
  // ProgressBarModule,
  // InplaceModule,

  // Button
  // ToggleButtonModule,
  SelectButtonModule,
  ButtonModule,
  SplitButtonModule,

  // Data presentation
  // CarouselModule,
  DataTableModule,
  DataGridModule,
  DataListModule,
  DataScrollerModule,
  // GMapModule,
  OrderListModule,
  OrganizationChartModule,
  PaginatorModule,
  PickListModule,
  ScheduleModule,
  TreeModule,
  TreeTableModule,
  // TreeNode,
  // GalleriaModule,

  // Grouping
  AccordionModule,
  FieldsetModule,
  PanelModule,
  TabViewModule,
  ToolbarModule,
  BreadcrumbModule,

  // Menu
  ContextMenuModule,
  // MenuItem,
  // MegaMenuModule,
  MenuModule,
  MenubarModule,
  PanelMenuModule,
  // SlideMenuModule,
  // StepsModule,
  TabMenuModule,
  // TieredMenuModule,

  // Dialog
  DialogModule,
  ConfirmDialogModule,
  // LightboxModule,
  OverlayPanelModule,
  TooltipModule,
  BlockUIModule,

  FileUploadModule,

  ChartModule,

  GrowlModule,
  MessagesModule,

  // Advance
  DragDropModule,
  // CaptchaModule,
  // CodeHighlighterModule,
  // DeferModule,
  TerminalModule,
];

// PRIME SERVICES
import {
  TreeDragDropService,
  ConfirmationService
} from 'primeng/primeng';
import { TerminalService } from 'primeng/components/terminal/terminalservice';

const PRIMENG_SERVICES = [
  TreeDragDropService,
  ConfirmationService,
  TerminalService,
];

@NgModule({
  declarations: [
  ],
  imports: [
    ...PRIMENG_MODULES,
  ],
  exports: [
    ...PRIMENG_MODULES,
  ],
})
export class NgbModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: NgbModule,
      providers: [
        ...PRIMENG_SERVICES,
      ],
    };
  }
}
