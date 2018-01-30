import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Message, TreeNode, MenuItem, ConfirmationService } from 'primeng/primeng';
import * as _ from 'lodash';

import { TranslateService } from '@ngx-translate/core';
import { GlobalState } from '../../../global.state';
import {
  LocalStorageService,
  NavigationService,
  MenuService,

  TcodeService,
  ArrayService,
} from '../../../nga/services';
import { BaseComponent } from '../../base';

import { FavTcodeService } from './favTcode.service';

@Component({
  selector: 'fav',
  templateUrl: './fav.html',
  styleUrls: ['./fav.scss'],
})

export class Fav extends BaseComponent implements OnInit, OnDestroy {

  myScope = 'fav';

  // Override Base class properties
  pageTitle = 'home';
  sidebarMenuJSONFile = 'blank.menu.json';
  globalConfig = {
    language: false,
    trackHistory: true
  };

  // Derive class properties
  msgs: Message[];
  items: MenuItem[];

  // Tree Table List and selected Node
  favList: TreeNode[];
  selectedNode: TreeNode;

  // Move To Dialog and target Node
  displayMoveDialog = false;
  targetNode: TreeNode;

  // Validation params
  param = {value: '3'};

  // Shared form properties
  isRenameDialog = false;
  dialogTitle = '';

  // Section Dialog
  displaySectionDialog = false;
  sectionForm: FormGroup;

  // Item Dialog
  displayDocumentDialog = false;
  documentForm: FormGroup;

  langList = {
    execute: 'Execute',
    newSection: 'New Section',
    newItem: 'New Item',
    rename: 'Rename',
    delete: 'Delete',
    move: 'Move',
    sortAZ: 'Sort A-Z',
    sortZA: 'Sort Z-A',
    expandAll: 'Expand All',
    collapseAll: 'Collapse All',
    flag: 'Flag',
    save: 'Save',
    cancel: 'Cancel',
    selectItemToExecute: 'Select item to execute!',
    rootCanNotBeMoved: 'Root can not be moved!',
    rootCanNotBeDeleted: 'Root can not be deleted!',
    actionCompleted: 'Action completed!',
    actionCancelled: 'Action cancelled!',
    wouldYouConfirm: 'Would you please confirm the action?',
    yes: 'yes',
    no: 'no'
  };

  constructor(
    // Base class services
    public translateService: TranslateService,
    public globalState: GlobalState,
    public localStorageService: LocalStorageService,
    public navigationService: NavigationService,
    public menuService: MenuService,

    // Derive class services
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private tcodeService: TcodeService,
    private arrayService: ArrayService,
    private favListService: FavTcodeService,
  ) {
    // Base class constructor: Re-injection for inheritance
    super(translateService, globalState, localStorageService, navigationService, menuService);

    // Derive class constructor
  }

  ngOnInit() {
    // Base class initialization
    super.ngOnInit();
    this.subscribeGlobalState();

    // Derive class initialization
    this.initSidebarMenu();
    this.subscribeLocalState();
    this.globalState.notifyMyDataChanged('help', '', 'fav');

    this.initForms();
    this.initContextMenu();
    this.initFavListPage();

  }

  initContextMenu() {
    this.translateService.get([
      'execute',
      'newSection',
      'newItem',
      'rename',
      'delete',
      'move',
      'sortAZ',
      'sortZA',
      'expandAll',
      'collapseAll',
      'flag',
      'save',
      'cancel',
      'selectItemToExecute',
      'rootCanNotBeMoved',
      'rootCanNotBeDeleted',
      'actionCompleted',
      'actionCancelled',
      'wouldYouConfirm',
      'yes',
      'no'
    ])
      .subscribe((res) => {
        this.langList = res;
        console.log(this.langList);

        this.items = [];
        this.items.push(
          { label: this.langList['execute'], icon: 'ui-icon-navigation', command: (event) => this.openFavExpandSection() },
          { separator: true },

          { label: this.langList['newSection'], icon: 'ui-icon-create-new-folder',
            command: (event) => this.showRenameSectionDialog(false, null) },
          { label: this.langList['newItem'], icon: 'ui-icon-favorite-border', command: (event) => this.showRenameItemDialog(false, null) },
          { label: this.langList['rename'], icon: 'ui-icon-create', command: (event) => this.renameSectionOrItem(this.selectedNode) },
          { label: this.langList['delete'], icon: 'ui-icon-delete', command: (event) => this.confirmDelete() },
          { label: this.langList['move'], icon: 'ui-icon-open-with', command: (event) => this.moveInTree() },
          { separator: true },

          { label: this.langList['sortAZ'], icon: 'ui-icon-vertical-align-bottom', command: (event) => this.sortTreeAsc() },
          { label: this.langList['sortZA'], icon: 'ui-icon-vertical-align-top', command: (event) => this.sortTreeDesc() },
          { label: this.langList['expandAll'], icon: 'ui-icon-expand-more', command: (event) => this.sortTreeAsc() },
          { label: this.langList['collapseAll'], icon: 'ui-icon-expand-less', command: (event) => this.sortTreeDesc() },
          { separator: true },

          { label: this.langList['flag'], icon: 'ui-icon-flag', command: (event) => this.flagDocument() },
        );
      });
  }

  initForms() {
    this.sectionForm = this.fb.group({
      'sectionLabel': new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      'sectionIcon': new FormControl('folder_open')
    });

    this.documentForm = this.fb.group({
      'documentLabel': new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      'documentIcon': new FormControl('favorite'),
      'documentDesc': new FormControl(''),
      'documentUrl': new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
    });
  }

  initFavListPage() {
    this.refreshTree();
  }

  refreshTree() {
    this.favList = JSON.parse(JSON.stringify(this.favListService.getFavList()));
    console.log(this.favList);
    this.selectedNode = null;
    this.expandAll();
  }

  moveInTree() {
    /*
     * Do not move if selectedNode is undeterminable
     * Root node could not be moved
     */
    if (!this.selectedNode) {
      this.msgs = [];
      this.msgs.push({ severity: 'warn', summary: this.langList['move'], detail: this.langList['selectItemToExecute'] });
      this.globalState.notifyMyDataChanged('notificationMessage', '', this.msgs);
      return false;
    }

    if (!this.selectedNode.parent) {
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: this.langList['move'], detail: this.langList['rootCanNotBeMoved'] });
      this.globalState.notifyMyDataChanged('notificationMessage', '', this.msgs);
      return false;
    }

    this.targetNode = null;
    this.displayMoveDialog = true;
  }

  moveNode() {
    /*
     * Do not move if targetNode is undeterminable
     * Do not move if targetNode is its self (error)
     *
     * Do not move if targetNode suggest no change of node position in tree
     */
    if ((!this.targetNode) || (this.selectedNode === this.targetNode)) {
      this.displayMoveDialog = false;
      return false;
    }

    if (this.targetNode.data.type === 'section') {
      if (this.selectedNode.parent !== this.targetNode) {
        if (!this.targetNode.children) {
          this.targetNode.children = [];
        }
        this.targetNode.children.push(this.selectedNode);
        this.deleteNode(this.selectedNode);
      }
    } else {
      if (this.selectedNode.parent !== this.targetNode.parent) {
        this.targetNode.parent.children.push(this.selectedNode);
        this.deleteNode(this.selectedNode);
      }
    }

    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: this.langList['move'], detail: this.langList['actionCompleted'] });
    this.globalState.notifyMyDataChanged('notificationMessage', '', this.msgs);
    this.displayMoveDialog = false;
    this.saveFav2LocalStorage();
  }

  sortTreeAsc() {
    const sortRecursive = (node, fn) => {
      fn(node);
      if (this.arrayService.getLengthArrayOfObject(node.children) > 0) {
        node.children.forEach(function(e){
            sortRecursive(e, fn);
        });
        node.children.sort((a, b) => {
          return (a.data.label > b.data.label) ? 1 : ((b.data.label > a.data.label) ? -1 : 0);
        });
      }
    };

    sortRecursive(this.favList[0], (node) => {
      // console.log(node);
    });
  }

  sortTreeDesc() {
    const sortRecursive = (node, fn) => {
      fn(node);
      if (this.arrayService.getLengthArrayOfObject(node.children) > 0) {
        node.children.forEach(function(e){
            sortRecursive(e, fn);
        });
        node.children.sort((a, b) => {
          return (a.data.label > b.data.label) ? -1 : ((b.data.label > a.data.label) ? 1 : 0);
        });
      }
    };

    sortRecursive(this.favList[0], (node) => {
      // console.log(node);
    });
  }

  flagDocument() {
    if (!this.selectedNode) {
      this.msgs = [];
      this.msgs.push({ severity: 'warn', summary: this.langList['flag'], detail: this.langList['selectItemToExecute'] });
      this.globalState.notifyMyDataChanged('notificationMessage', '', this.msgs);
      return false;
    }
    this.selectedNode.data.flag = !this.selectedNode.data.flag;
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: this.langList['flag'], detail: this.langList['actionCompleted'] });
    this.globalState.notifyMyDataChanged('notificationMessage', '', this.msgs);
    this.saveFav2LocalStorage();
  }

  nodeSelect(event) {
      // this.msgs = [];
      // this.msgs.push({ severity: 'success', summary: 'Node Selected', detail: event.node.data.name });
      // console.log(event.node);
  }

  nodeUnselect(event) {
      // this.msgs = [];
      // this.msgs.push({ severity: 'success', summary: 'Node Unselected', detail: event.node.data.name });
  }

  checkNodeThenProceed(cb) {
    console.log(this.selectedNode);
    if (!this.selectedNode) {
      this.msgs = [];
      this.msgs.push({ severity: 'warn', summary: this.langList['move'], detail: this.langList['selectItemToExecute'] });
      this.globalState.notifyMyDataChanged('notificationMessage', '', this.msgs);
      return false;
    } else {
      cb();
    }
  }

  openFavExpandSection() {
    if (!this.selectedNode) {
      this.msgs = [];
      this.msgs.push({ severity: 'warn', summary: this.langList['expandAll'], detail: this.langList['selectItemToExecute'] });
      this.globalState.notifyMyDataChanged('notificationMessage', '', this.msgs);
      return false;
    }
    if (this.selectedNode.data.type === 'tcode') {
        if (this.selectedNode.data.url.trim()) {
          this.tcodeService.executeUrl(this.selectedNode.data.url);
        } else {
          alert(`Can not define URL`);
        }
    } else {
      this.selectedNode.expanded = true;
      this.msgs = [];
      this.msgs.push({ severity: 'success', summary: this.langList['expandAll'], detail: this.langList['actionCompleted'] });
      this.globalState.notifyMyDataChanged('notificationMessage', '', this.msgs);
    }
  }

  showRenameSectionDialog(isRename: boolean = false, node: TreeNode = null) {
    if (!isRename) {
      console.log('New Section');
      this.sectionForm.reset();
      this.dialogTitle = this.langList['newSection'];
      this.sectionForm = this.fb.group({
        'sectionLabel': new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
        'sectionIcon': new FormControl('folder_open')
      });
      this.displaySectionDialog = true;
      this.isRenameDialog = false;
    } else {
      console.log('Rename Section');
      if (!node) {
        this.msgs = [];
        this.msgs.push({ severity: 'warn', summary: this.langList['rename'], detail: this.langList['selectItemToExecute'] });
        this.globalState.notifyMyDataChanged('notificationMessage', '', this.msgs);
        return false;
      } else {
        console.log(node.data);
        this.sectionForm.reset();
        this.dialogTitle = this.langList['rename'];

        this.sectionForm = this.fb.group({
          'sectionLabel': new FormControl(this.selectedNode.data.label, Validators.compose([Validators.required, Validators.minLength(3)])),
          'sectionIcon': new FormControl(this.selectedNode.data.icon)
        });
        this.displaySectionDialog = true;
        this.isRenameDialog = true;
      }
    }
  }

  showRenameItemDialog(isRename: boolean = false, node: TreeNode = null) {
    if (!isRename) {
      console.log('New Item');
      this.documentForm.reset();
      this.dialogTitle = this.langList['newItem'];
      this.documentForm = this.fb.group({
        'documentLabel': new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
        'documentIcon': new FormControl('favorite'),
        'documentDesc': new FormControl(''),
        'documentUrl': new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      });
      this.displayDocumentDialog = true;
      this.isRenameDialog = false;
    } else {
      console.log('Rename Item');
      if (!node) {
        this.msgs = [];
        this.msgs.push({ severity: 'warn', summary: this.langList['rename'], detail: this.langList['selectItemToExecute'] });
        this.globalState.notifyMyDataChanged('notificationMessage', '', this.msgs);
        return false;
      } else {
        this.documentForm.reset();
        this.dialogTitle = 'Rename Item';
        this.documentForm = this.fb.group({
          'documentLabel': new FormControl(
            this.selectedNode.data.label,
            Validators.compose([Validators.required, Validators.minLength(3)])
          ),
          'documentIcon': new FormControl(this.selectedNode.data.icon),
          'documentDesc': new FormControl(this.selectedNode.data.desc),
          'documentUrl': new FormControl(this.selectedNode.data.url, Validators.compose([Validators.required, Validators.minLength(3)])),
        });
        this.displayDocumentDialog = true;
        this.isRenameDialog = true;
      }
    }
  }

  renameSectionOrItem(node: TreeNode = null) {
    if (!node) {
      this.msgs = [];
      this.msgs.push({ severity: 'warn', summary: this.langList['rename'], detail: this.langList['selectItemToExecute'] });
      this.globalState.notifyMyDataChanged('notificationMessage', '', this.msgs);
      return false;
    } else {
      if (node.data.type === 'section') {
        console.log('Show Rename Section Dialog');
        this.showRenameSectionDialog(true, node);
      } else {
        console.log('Show Rename Document Dialog');
        this.showRenameItemDialog(true, node);
      }
    }
  }

  saveSection() {
    if (!this.isRenameDialog) {
      // If no node selected, set to root
      if (!this.selectedNode) {
        this.selectedNode = this.favList[0];
      }

      if ((this.selectedNode.data.type === 'section') || (!this.selectedNode.parent)) {
        this.selectedNode.children.push({
          'data': {
            'label': this.sectionForm.controls.sectionLabel.value,
            'icon': this.sectionForm.controls.sectionIcon.value,
            'type': 'section',
          },
          'children': [],
        });
      } else {
        this.selectedNode.parent.children.push({
          'data': {
            'label': this.sectionForm.controls.sectionLabel.value,
            'icon': this.sectionForm.controls.sectionIcon.value,
            'type': 'section',
          },
          'children': [],
        });
      }
    } else {
      this.selectedNode.data.label = this.sectionForm.controls.sectionLabel.value;
      this.selectedNode.data.icon = this.sectionForm.controls.sectionIcon.value;
    }

    this.saveFav2LocalStorage();

    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: this.langList['save'], detail: this.langList['actionCompleted'] });
    this.globalState.notifyMyDataChanged('notificationMessage', '', this.msgs);
    this.displaySectionDialog = false;
  }

  saveDocument() {
    if (!this.isRenameDialog) {
      // If no node selected, set to root
      if (!this.selectedNode) {
        this.selectedNode = this.favList[0];
      }

      if ((this.selectedNode.data.type === 'section') || (!this.selectedNode.parent)) {
        this.selectedNode.children.push({
          'data': {
            'label': this.documentForm.controls.documentLabel.value,
            'icon': this.documentForm.controls.documentIcon.value,
            'desc': this.documentForm.controls.documentDesc.value,
            'url': this.documentForm.controls.documentUrl.value,
            'flag': false,
            'type': 'tcode',
          },
        });
      } else {
        this.selectedNode.parent.children.push({
          'data': {
            'label': this.documentForm.controls.documentLabel.value,
            'icon': this.documentForm.controls.documentIcon.value,
            'desc': this.documentForm.controls.documentDesc.value,
            'url': this.documentForm.controls.documentUrl.value,
            'flag': false,
            'type': 'tcode',
          },
        });
      }
    } else {
      this.selectedNode.data.label = this.documentForm.controls.documentLabel.value;
      this.selectedNode.data.icon = this.documentForm.controls.documentIcon.value;
      this.selectedNode.data.desc = this.documentForm.controls.documentDesc.value;
      this.selectedNode.data.url = this.documentForm.controls.documentUrl.value;
    }

    this.saveFav2LocalStorage();

    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: this.langList['save'], detail: this.langList['actionCompleted'] });
    this.globalState.notifyMyDataChanged('notificationMessage', '', this.msgs);
    this.displayDocumentDialog = false;
  }

  cancelDialog() {
    this.displayMoveDialog = false;
    this.displaySectionDialog = false;
    this.displayDocumentDialog = false;
  }

  confirmDelete() {
    this.msgs = [];

    if (!this.selectedNode) {
      this.msgs.push({ severity: 'warn', summary: this.langList['delete'], detail: this.langList['selectItemToExecute'] });
      this.globalState.notifyMyDataChanged('notificationMessage', '', this.msgs);
      return false;
    }

    if (!this.selectedNode.parent) {
      this.msgs = [{ severity: 'error', summary: this.langList['delete'], detail: this.langList['rootCanNotBeDeleted'] }];
      this.globalState.notifyMyDataChanged('notificationMessage', '', this.msgs);
      return false;
    }

    if (this.selectedNode.data.type === 'section') {
      this.confirmationService.confirm({
          message: this.langList['wouldYouConfirm'],
          header: this.langList['delete'],
          icon: 'ui-icon-help',
          // acceptLabel: this.langList['yes'],
          // acceptIcon: 'fa-check',
          // rejectLabel: this.langList['no'],
          // rejectIcon: 'fa-close',
          accept: () => {
              if (this.selectedNode.children) {
                this.selectedNode.parent.children.push(...this.selectedNode.children);
              }
              this.deleteNode(this.selectedNode);
          },
          reject: () => {
              this.msgs = [{ severity: 'info', summary: this.langList['cancel'], detail: this.langList['actionCancelled'] }];
              this.globalState.notifyMyDataChanged('notificationMessage', '', this.msgs);
          },
      });
    } else {
      this.confirmationService.confirm({
          message: this.langList['wouldYouConfirm'],
          header: this.langList['delete'],
          icon: 'ui-icon-help',
          // acceptLabel: this.langList['yes'],
          // acceptIcon: 'fa-check',
          // rejectLabel: this.langList['no'],
          // rejectIcon: 'fa-close',
          accept: () => {
              this.deleteNode(this.selectedNode);


          },
          reject: () => {
              this.msgs = [{ severity: 'info', summary: this.langList['cancel'], detail: this.langList['actionCancelled'] }];
              this.globalState.notifyMyDataChanged('notificationMessage', '', this.msgs);
          },
      });
    }
  }

  deleteNode(node: TreeNode) {
      node.parent.children = node.parent.children.filter( n => n.data !== node.data);
      this.msgs = [];
      this.msgs.push({ severity: 'success', summary: this.langList['delete'], detail: this.langList['actionCompleted'] });
      this.globalState.notifyMyDataChanged('notificationMessage', '', this.msgs);

      this.saveFav2LocalStorage();
  }

  unselectFile() {
      this.selectedNode = null;
  }

  expandAll() {
      this.favList.forEach( node => {
          this.expandRecursive(node, true);
      } );
  }

  collapseAll() {
      this.favList.forEach( node => {
          this.expandRecursive(node, false);
      } );
  }

  private expandRecursive(node: TreeNode, isExpand: boolean) {
      if (node.data.type === 'section') {
        node.expanded = isExpand;
      }
      if (node.children) {
          node.children.forEach( childNode => {
              this.expandRecursive(childNode, isExpand);
          } );
      }
  }

  saveFav2LocalStorage() {
    let cleanedList = _.cloneDeep(this.favList);
    // To cleanup the tree and avoid JSON recursive error due to JSON.stringify
    this.cleanRecursive(cleanedList[0]);

    this.localStorageService.setFav(cleanedList);
  }

  private cleanRecursive(node: TreeNode) {
      delete node.parent;
      delete node.expanded;
      if (node.children) {
          node.children.forEach( childNode => {
              this.cleanRecursive(childNode);
          } );
      }
  }

  ngOnDestroy() {
    // Base class destroy
    super.ngOnDestroy();

    // Derive class destroy here
    this.unscribeLocalState();
  }

  /* LOCAL STATE */
  subscribeLocalState() {
    this.globalState.subscribeEvent('language', this.myScope, (lang) => {
      this.translateService.use(lang);
      this.initContextMenu();
    });
  }

  unscribeLocalState() {
    this.globalState.unsubscribeEvent('language', this.myScope);
  }

}
