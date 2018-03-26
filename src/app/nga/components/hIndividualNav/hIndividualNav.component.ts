import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { Subscription } from 'rxjs/Subscription';

// Internal
import { GlobalState } from '../../../global.state';
import {
  TcodeService,
} from '../../../nga/services';

@Component({
  selector: 'h-individual-nav',
  templateUrl: './hIndividualNav.html',
  styleUrls: ['./hIndividualNav.scss'],
})
export class HIndividualNav implements OnInit, OnDestroy {

  myScope = 'gk-individual-nav';

  @Input() prefix: string;
  @Output() onSelectAction: EventEmitter<any> = new EventEmitter();

  items: MenuItem[];

  langSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,

    private globalState: GlobalState,
    private tcodeService: TcodeService,
  ) {
    this.subscribeLocalState();
  }

  ngOnInit () {
    this.initNav();
  }

  initNav() {
    this.translate.get(['create', 'view', 'edit', 'disable', 'enable', 'mark', 'unmark', 'delete', 'viewChange'])
      .subscribe((res) => {

        this.items = [
          {
            label: res.create, icon: 'ui-icon-add',
            command: (event) => this.executeTcode('11')
          },
          {
            label: res.view, icon: 'ui-icon-search',
            command: (event) => this.executeTcode('12')
          },
          {
            label: res.edit, icon: 'ui-icon-edit',
            command: (event) => this.executeTcode('13')
          },
          // { separator: true },
          {
            label: res.disable, icon: 'ui-icon-bookmark',
            command: (event) => this.executeTcode('14')
          },
          {
            label: res.enable, icon: 'ui-icon-bookmark-border',
            command: (event) => this.executeTcode('15')
          },
          // { separator: true },
          {
            label: res.mark, icon: 'ui-icon-visibility-off',
            command: (event) => this.executeTcode('16')
          },
          {
            label: res.unmark, icon: 'ui-icon-visibility',
            command: (event) => this.executeTcode('17')
          },
          // { separator: true },
          {
            label: res.delete, icon: 'ui-icon-delete-forever',
            command: (event) => this.executeTcode('18')
          },
          // { separator: true },
          {
            label: res.viewChange, icon: 'ui-icon-track-changes',
            command: (event) => this.executeTcode('19')
          },
        ];

      });
  }

  /**
   * executeTcode
   * A function that execute tcode based on prefix + action and id
   * Id is retrieve via activatedRoute.params or pass via component input (only for action 11 after successful saving)
   *
   * @param {string} action
   * @memberof GkIndividualNav
   */
  executeTcode(action: string): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      const tcode: string = this.prefix + action;
      let workingId = '';

      // Action 11 does not have accompanied id
      if (action !== '11') {
        workingId = params['id'] || '';
      }

      this.onSelectAction.emit({ action: action });
      this.tcodeService.executeTcode(tcode, workingId);
    });
  }

  ngOnDestroy() {
    this.unsubscribeLocalState();
  }

  /* LOCAL STATE */
  subscribeLocalState() {
    this.globalState.subscribeEvent('language', this.myScope, (lang) => {
      console.log(lang);
      this.translate.use(lang);
      this.initNav();
    });
  }

  unsubscribeLocalState() {
    this.globalState.unsubscribeEvent('language', this.myScope);
  }

}
