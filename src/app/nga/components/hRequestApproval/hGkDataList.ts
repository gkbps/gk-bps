import {NgModule,Component,ElementRef,AfterViewInit,AfterContentInit,DoCheck,OnInit,OnDestroy,Input,Output,SimpleChange,EventEmitter,ContentChild,ContentChildren,TemplateRef,QueryList,IterableDiffers} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule,Header,Footer,PrimeTemplate} from 'primeng/primeng';
import {PaginatorModule} from 'primeng/primeng';
import {BlockableUI} from 'primeng/primeng';

// Insert
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    selector: 'h-gk-dataList',
    template: `
        <div [ngClass]="{'ui-datalist ui-widget': true, 'ui-datalist-scrollable': scrollable}" [ngStyle]="style" [class]="styleClass">
            <div class="ui-datalist-header ui-widget-header ui-corner-top" *ngIf="header">
                <ng-content select="p-header"></ng-content>
            </div>
            <p-paginator [rows]="rows" [first]="first" [totalRecords]="totalRecords" [pageLinkSize]="pageLinks" [alwaysShow]="alwaysShowPaginator"
            (onPageChange)="paginate($event)" styleClass="ui-paginator-bottom" [rowsPerPageOptions]="rowsPerPageOptions" *ngIf="paginator && (paginatorPosition === 'top' || paginatorPosition =='both')"></p-paginator>
            <div class="ui-datalist-content ui-widget-content" [ngStyle]="{'max-height': scrollHeight}">
                <div *ngIf="isEmpty()" class="ui-datalist-emptymessage">{{emptyMessage}}</div>
                <ul class="ui-datalist-data">
                    <li *ngFor="let item of dataToRender;let i = index;trackBy: trackBy">
                        <ng-template [pTemplateWrapper]="itemTemplate" [item]="item" [index]="i + first"></ng-template>
                    </li>
                </ul>
            </div>
            <p-paginator [rows]="rows" [first]="first" [totalRecords]="totalRecords" [pageLinkSize]="pageLinks" [alwaysShow]="alwaysShowPaginator"
            (onPageChange)="paginate($event)" styleClass="ui-paginator-bottom" [rowsPerPageOptions]="rowsPerPageOptions" *ngIf="paginator && (paginatorPosition === 'bottom' || paginatorPosition =='both')"></p-paginator>
            <div class="ui-datalist-footer ui-widget-header ui-corner-bottom" *ngIf="footer">
                <ng-content select="p-footer"></ng-content>
            </div>
        </div>
    `
})
export class HGkDataList implements OnInit,AfterViewInit,AfterContentInit,DoCheck,BlockableUI {

    @Input() paginator: boolean;

    @Input() rows: number;

    @Input() totalRecords: number;

    @Input() pageLinks: number = 5;

    @Input() rowsPerPageOptions: number[];

    @Input() lazy: boolean;

    @Output() onLazyLoad: EventEmitter<any> = new EventEmitter();

    @Input() style: any;

    @Input() styleClass: string;

    @Input() paginatorPosition: string = 'bottom';

    @Input() emptyMessage: string = 'No records found';

    @Input() alwaysShowPaginator: boolean = true;

    @Input() trackBy: Function = (index: number, item: any) => item;

    @Input() immutable: boolean = true;

    @Input() scrollable: boolean;

    @Input() scrollHeight: string;

    @Output() onPage: EventEmitter<any> = new EventEmitter();

    @ContentChild(Header) header;

    @ContentChild(Footer) footer;

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    public _value = new BehaviorSubject<any[]>([]); // Change

    public itemTemplate: TemplateRef<any>;

    public dataToRender: any[];

    public first: number = 0;

    public page: number = 0;

    differ: any;

    constructor(public el: ElementRef, public differs: IterableDiffers) {
		this.differ = differs.find([]).create(null);
	}

    ngOnInit() {
        // Insert
        this._value.subscribe(x => {
            console.log(x);
            if(this.immutable) {
                this.handleDataChange();
            }
        })
    }

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch(item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                break;

                default:
                    this.itemTemplate = item.template;
                break;
            }
        });
    }

    ngAfterViewInit() {
        if(this.lazy) {
            this.onLazyLoad.emit({
                first: this.first,
                rows: this.rows
            });
        }
    }

    @Input() get value(): any[] {
        return this._value.getValue(); // Change
    }

    set value(val:any[]) {
        this._value.next(val); // Change

        if(this.immutable) {
            this.handleDataChange();
        }

    }

    handleDataChange() {
        if(this.paginator) {
            this.updatePaginator();
        }
        console.log(this.value);
        this.updateDataToRender(this.value);
    }

    ngDoCheck() {
        if(!this.immutable) {
            let changes = this.differ.diff(this.value);
            if(changes) {
                this.handleDataChange();
            }
        }
    }

    updatePaginator() {
        //total records
        this.totalRecords = this.lazy ? this.totalRecords : (this.value ? this.value.length: 0);

        //first
        if(this.totalRecords && this.first >= this.totalRecords) {
            let numberOfPages = Math.ceil(this.totalRecords/this.rows);
            this.first = Math.max((numberOfPages-1) * this.rows, 0);
        }
    }

    paginate(event) {
        this.first = event.first;
        this.rows = event.rows;

        if(this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        else {
            this.updateDataToRender(this.value);
        }

        this.onPage.emit({
            first: this.first,
            rows: this.rows
        });
    }

    updateDataToRender(datasource) {
        if(this.paginator && datasource) {
            this.dataToRender = [];
            let startIndex = this.lazy ? 0 : this.first;
            for(let i = startIndex; i < (startIndex+ this.rows); i++) {
                if(i >= datasource.length) {
                    break;
                }

                this.dataToRender.push(datasource[i]);
            }
        }
        else {
            this.dataToRender = datasource;
        }
    }

    isEmpty() {
        return !this.dataToRender||(this.dataToRender.length == 0);
    }

    createLazyLoadMetadata(): any {
        return {
            first: this.first,
            rows: this.rows
        };
    }

    getBlockableElement(): HTMLElement {
        return this.el.nativeElement.children[0];
    }

    ngOnDestroy() {
        this._value.unsubscribe();
    }
}

@NgModule({
    imports: [CommonModule,SharedModule,PaginatorModule],
    exports: [HGkDataList, SharedModule],
    declarations: [HGkDataList]
})
export class HGkDataListModule { }
