import {
  Component, Input, OnInit, OnDestroy,
  ViewChild, ViewContainerRef,
  ComponentFactoryResolver, ComponentRef
} from '@angular/core';

@Component({
  selector: 'dynamic-content',
  template: `
    <div>
      <div #container></div>
    </div>
  `
})
export class DynamicContentComponent implements OnInit, OnDestroy {

  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef;

  @Input() type: string;
  @Input() context: any;

  private mappings = {
    'sample1': DynamicSample1Component,
    'sample2': DynamicSample2Component
  };

  private componentRef: ComponentRef<{}>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver) {
  }

  getComponentType(typeName: string) {
      let type = this.mappings[typeName];
      return type || UnknownDynamicComponent;
  }

  ngOnInit() {
      if (this.type) {
        let componentType = this.getComponentType(this.type);

        // note: componentType must be declared within module.entryComponents
        let factory = this.componentFactoryResolver.resolveComponentFactory(componentType);
        this.componentRef = this.container.createComponent(factory);

        // set component context
        let instance = <DynamicComponent> this.componentRef.instance;
        instance.context = this.context;
      }
  }

  ngOnDestroy() {
    if (this.componentRef) {
        this.componentRef.destroy();
        this.componentRef = null;
    }
  }

}

export abstract class DynamicComponent {
  context: any;
}

@Component({
  selector: 'dynamic-sample-1',
  template: `
    <div class="{{selectedLayout}}">
      <div class="card">
        <div class="ui-g">

          <div class="ui-g-12">
            <p-toolbar>
              <div class="ui-toolbar-group-left">
                {{title}}
              </div>

              <div class="ui-toolbar-group-right">
                <button pButton type="button" icon="ui-icon-photo-camera" (click)="changeEditStatus()" pTooltip="{{'inProgress'|translate}}" tooltipPosition="top"></button>
                <button pButton type="button" icon="ui-icon-settings-input-component" (click)="changeEditStatus()" pTooltip="{{'inProgress'|translate}}" tooltipPosition="top"></button>
                <button pButton type="button" icon="ui-icon-delete" (click)="gotoTcode('tray13')" pTooltip="{{'completed'|translate}}" tooltipPosition="top"></button>
              </div>
            </p-toolbar>
          </div>

          <div *ngIf="edit" class="ui-g-12">
            <span class="md-inputfield fixed-form">
              <input pInputText type="text" name="type" [(ngModel)]="title"/>
              <label>{{'type'|translate}}</label>
            </span>
            <p-dropdown
              [options]="stdLayoutList"
              [(ngModel)]="selectedLayout"
              placeholder="Select a layout"
              (onChange)="selectLayout()">
            </p-dropdown>
          </div>

          <div *ngIf="!edit" class="ui-g-12">
            Dynamic sample 1 ({{context?.text}})
          </div>

        </div>
      </div>
    </div>
  `
})
export class DynamicSample1Component extends DynamicComponent {
  title = 'Dashboard Component';
  edit = true;
  stdLayoutList = [
    {
      label: '3 / 12',
      value: 'ui-g-3'
    },
    {
      label: '4 / 12',
      value: 'ui-g-4'
    },
    {
      label: '5 / 12',
      value: 'ui-g-5'
    },
    {
      label: '6 / 12',
      value: 'ui-g-6'
    },
    {
      label: '7 / 12',
      value: 'ui-g-7'
    },
    {
      label: '8 / 12',
      value: 'ui-g-8'
    },
    {
      label: '9 / 12',
      value: 'ui-g-9'
    },
    {
      label: '12 / 12',
      value: 'ui-g-12'
    },
  ];

  selectedLayout = 'ui-g-6';

  constructor() {
    super();
  }

  changeEditStatus() {
    this.edit = !this.edit;
  }

  selectLayout() {
    console.log(this.selectedLayout);
  }
}

@Component({
  selector: 'dynamic-sample-2',
  template: `<div class='{{context?.grid}}'>Dynamic sample 2 ({{context?.text}})</div>`
})
export class DynamicSample2Component extends DynamicComponent {}

@Component({
  selector: 'unknown-component',
  template: `<div class='{{context?.grid}}'>Unknown component ({{context?.text}})</div>`
})
export class UnknownDynamicComponent extends DynamicComponent {}
