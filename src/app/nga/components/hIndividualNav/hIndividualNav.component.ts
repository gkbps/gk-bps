import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem, SelectItem } from 'primeng/primeng';
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
            command: (event) => this.executeTCode('11')
          },
          {
            label: res.view, icon: 'ui-icon-search',
            command: (event) => this.executeTCode('12')
          },
          {
            label: res.edit, icon: 'ui-icon-edit',
            command: (event) => this.executeTCode('13')
          },
          { separator: true },
          {
            label: res.disable, icon: 'ui-icon-bookmark',
            command: (event) => this.executeTCode('14')
          },
          {
            label: res.enable, icon: 'ui-icon-bookmark-border',
            command: (event) => this.executeTCode('15')
          },
          { separator: true },
          {
            label: res.mark, icon: 'ui-icon-visibility-off',
            command: (event) => this.executeTCode('16')
          },
          {
            label: res.unmark, icon: 'ui-icon-visibility',
            command: (event) => this.executeTCode('17')
          },
          { separator: true },
          {
            label: res.delete, icon: 'ui-icon-delete-forever',
            command: (event) => this.executeTCode('18')
          },
          { separator: true },
          {
            label: res.viewChange, icon: 'ui-icon-track-changes',
            command: (event) => this.executeTCode('19')
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
  executeTCode(action: string): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      const tcode: string = this.prefix + action;
      let workingId = '';

      // Action 11 does not have accompanied id
      if (action !== '11') {
        workingId = params['id'] || '';
      }

      this.tcodeService.executeTCode(tcode, workingId);
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
