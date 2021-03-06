import { Component, OnInit, OnDestroy } from '@angular/core';

/* RUNTIME COMPONENTS */
import {
    ViewChild,
    ViewContainerRef,
    ComponentRef,
    Compiler,
    ComponentFactory,
    NgModule,
    ModuleWithComponentFactories,
    ComponentFactoryResolver
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { HChartDoughnutModule } from '../../../../../../nga/components/hChartDoughnut';
/* ./RUNTIME COMPONENTS */

import { TranslateService } from '@ngx-translate/core';

import { GlobalState } from '../../../../../../global.state';
import { LocalStorageService } from '../../../../../../nga/services/localStorage.service';
import { MenuService } from '../../../../../../nga/services/menu.service';
import { NavigationService } from '../../../../../../nga/services/navigation.service';

import { SecurityService } from '../../../../../../nga/services/security.service';
import { TcodeService } from '../../../../../../nga/services/tcode.service';

import { BaseComponent } from '../../../../../base';

@Component({
  templateUrl: 'gkcln52.component.html'
})
export class GkCln52Component extends BaseComponent implements OnInit, OnDestroy {

  // Override Base class properties
  pageTitle = 'gkcln';
  sidebarMenuJSONFile = 'gkcln.menu.json';
  globalConfig = {
    language: false,
    trackHistory: true
  };

  // Derive class properties
  tcode = 'gkcln52';


  /* RUNTIME COMPONENTS */
  grid = [
  ];

  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef;
  private componentRef: ComponentRef<{}>;
  template = '<div>\nHello, {{name}}\n</div>';
  /* ./RUNTIME COMPONENTS */

  constructor(
    // Base class services
    public translateService: TranslateService,
    public globalState: GlobalState,
    public localStorageService: LocalStorageService,
    public navigationService: NavigationService,
    public menuService: MenuService,

    // Derive class services

    /* RUNTIME COMPONENTS */
    private componentFactoryResolver: ComponentFactoryResolver,
    private compiler: Compiler
    /* ./RUNTIME COMPONENTS */
  ) {
    // Base class constructor: Re-injection for inheritance
    super(translateService, globalState, localStorageService, menuService, navigationService);
  }

  ngOnInit() {
    // Base class initialization
    super.ngOnInit();
    this.subscribeGlobalState();

    // Derive class initialization
    this.initSidebarMenu();
    this.globalState.notifyMyDataChanged('help', '', 'tcd.11.create');
  }

  /* RUNTIME COMPONENTS */
  compileTemplate() {
    const metadata = {
        selector: `runtime-component-sample`,
        template: this.template
    };

    const factory = this.createComponentFactorySync(this.compiler, metadata, null);

    if (this.componentRef) {
        this.componentRef.destroy();
        this.componentRef = null;
    }
    this.componentRef = this.container.createComponent(factory);
  }

  private createComponentFactorySync(compiler: Compiler, metadata: Component, componentClass: any): ComponentFactory<any> {
      const cmpClass = componentClass || class RuntimeComponent { name = 'Denys'; };
      const decoratedCmp = Component(metadata)(cmpClass);

      @NgModule({ imports: [CommonModule], declarations: [decoratedCmp] })
      class RuntimeComponentModule { }

      const module: ModuleWithComponentFactories<any> = compiler.compileModuleAndAllComponentsSync(RuntimeComponentModule);
      return module.componentFactories.find(f => f.componentType === decoratedCmp);
  }
  /* ./RUNTIME COMPONENTS */

  ngOnDestroy() {
    // Base class destroy
    super.ngOnDestroy();

    // Derive class destroy here
  }

}
