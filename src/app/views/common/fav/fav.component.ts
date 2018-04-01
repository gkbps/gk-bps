import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';

import { Message } from 'primeng/api';
import { TreeNode } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

import * as _ from 'lodash';

import { TranslateService } from '@ngx-translate/core';

// GK - Alphabet
import { GlobalState } from '../../../global.state';
import { LocalStorageService } from '../../../nga/services/localStorage.service';
import { NavigationService } from '../../../nga/services/navigation.service';
import { MenuService } from '../../../nga/services/menu.service';

import { ArrayService } from '../../../nga/services/array.service';
import { IconsService } from '../../../nga/common/icons.service';
import { TcodeService } from '../../../nga/services/tcode.service';

import { FavTcodeService } from './favTcode.service';

import { BaseComponent } from '../../base';

/**
* @module FavComponent
* Component for Fav(ourite)
*
* @function initContextMenu
* @function initForms
* @function initFavListPage
* @function refreshTree
*
* @function moveInTree
* @function moveNode
*
* @function sortTreeAsc
* @function sortTreeDesc
*
* @function flagDocument
* @function nodeSelect
* @function nodeUnselect
*
* @function checkNodeThenProceed
* @function openFavExpandSection
*
* @function showRenameSectionDialog
* @function showRenameItemDialog
* @function renameSectionOrItem
* @function saveSection
* @function saveDocument
* @function cancelDialog
*
* @function confirmDelete
* @function deleteNode
*
* @function unselectFile
*
* @function expandAll
* @function collapseAll
* @function expandRecursive
*
* @function saveFav2LocalStorage
* @function cleanRecursive
*/
@Component({
  selector: 'fav',
  templateUrl: './fav.html',
  styleUrls: ['./fav.scss'],
})

export class FavComponent extends BaseComponent implements OnInit, OnDestroy {

  myScope = 'fav';

  // Override Base class properties
  pageTitle = 'home';
  sidebarMenuJSONFile = 'home.menu.json';
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

  iconList = [];

  constructor(
    // Base class services
    public translateService: TranslateService,

    public globalState: GlobalState,
    public localStorageService: LocalStorageService,
    public menuService: MenuService,
    public navigationService: NavigationService,

    // Derive class services
    private fb: FormBuilder,

    private confirmationService: ConfirmationService,


    private arrayService: ArrayService,
    private iconsService: IconsService,
    private tcodeService: TcodeService,

    private favListService: FavTcodeService,
  ) {
    // Base class constructor: Re-injection for inheritance
    super(translateService, globalState, localStorageService, menuService, navigationService);

    // Derive class constructor
    this.iconList = iconsService.getIconsMenu();
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

  // OPERATIONS

  /**
  * @function initContextMenu
  * Initialize context menu by in force language
  */
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

  /**
  * @function initForms
  * Initialize sectionForm and documentForm
  */
  initForms() {
    this.sectionForm = this.fb.group({
      'sectionLabel': new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      'sectionIcon': new FormControl('folder_open')
    });

    this.documentForm = this.fb.group({
      'documentLabel': new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      'documentIcon': new FormControl('favorite'),
      'documentIcon1': new FormControl(''),
      'documentDesc': new FormControl(''),
      'documentUrl': new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
    });
  }

  /**
  * @function initFavListPage
  * Initialize Favourite page by refreshing Tree
  * {@linkTo refreshTree}
  */
  initFavListPage() {
    this.refreshTree();
  }

  /**
  * @function refreshTree
  * Refresh the tree and expand all nodes
  * {@linkTo expandAll}
  */
  refreshTree() {
    this.favList = JSON.parse(JSON.stringify(this.favListService.getFavList()));
    console.log(this.favList);
    this.selectedNode = null;
    this.expandAll();
  }

  /**
  * @function moveInTree
  * Show the Dialog to select destination node
  *
  * Principles:
  * - Do not move if selectedNode is undeterminable
  * - Root node could not be moved
  */
  moveInTree() {
    if (!this.selectedNode) {
      const toastData = {
        type: 'warning',
        title: this.langList['move'],
        msg: this.langList['selectItemToExecute'],
        showClose: true,
      };
      this.globalState.notifyMyDataChanged('toasty', '', toastData);
      return false;
    }

    if (!this.selectedNode.parent) {
      const toastData = {
        type: 'error',
        title: this.langList['move'],
        msg: this.langList['rootCanNotBeMoved'],
        showClose: true,
      };
      this.globalState.notifyMyDataChanged('toasty', '', toastData);
      return false;
    }

    this.targetNode = null;
    this.displayMoveDialog = true;
  }

  /**
  * @function moveNode
  * Move the target node to destination note and save into local storage
  *
  * Principles
  * - Do not move if targetNode is undeterminable
  * - Do not move if targetNode is its self (error)  *
  * - Do not move if targetNode suggest no change of node position in tree
  */
  moveNode() {
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

    const toastData = {
      type: 'success',
      title: this.langList['move'],
      msg: this.langList['actionCompleted'],
      showClose: true,
    };
    this.globalState.notifyMyDataChanged('toasty', '', toastData);

    this.displayMoveDialog = false;
    this.saveFav2LocalStorage();
  }

  /**
  * @function sortTreeAsc
  * Sort nodes of tree ascending
  */
  sortTreeAsc() {
    const sortRecursive = (node, fn) => {
      fn(node);
      if (this.arrayService.getLengthArrayOfObject(node.children) > 0) {
        node.children.forEach(function(e) {
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

  /**
  * @function sortTreeDesc
  * Sort nodes of tree descending
  */
  sortTreeDesc() {
    const sortRecursive = (node, fn) => {
      fn(node);
      if (this.arrayService.getLengthArrayOfObject(node.children) > 0) {
        node.children.forEach(function(e) {
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

  /**
  * @function flagDocument
  * Flag a document and save into local storage
  */
  flagDocument() {
    if (!this.selectedNode) {
      const _toastData = {
        type: 'warning',
        title: this.langList['flag'],
        msg: this.langList['selectItemToExecute'],
        showClose: true,
      };
      this.globalState.notifyMyDataChanged('toasty', '', _toastData);

      return false;
    }
    this.selectedNode.data.flag = !this.selectedNode.data.flag;

    const toastData = {
      type: 'success',
      title: this.langList['flag'],
      msg: this.langList['actionCompleted'],
      showClose: true,
    };
    this.globalState.notifyMyDataChanged('toasty', '', toastData);

    this.saveFav2LocalStorage();
  }

  /**
  * @function nodeSelect
  * Event return information of selected node
  */
  nodeSelect(event) {
      // this.msgs = [];
      // this.msgs.push({ severity: 'success', summary: 'Node Selected', detail: event.node.data.name });
      // console.log(event.node);
  }

  /**
  * @function nodeUnselect
  * Event return information of node is just unselected
  */
  nodeUnselect(event) {
      // this.msgs = [];
      // this.msgs.push({ severity: 'success', summary: 'Node Unselected', detail: event.node.data.name });
  }

  /**
  * @function checkNodeThenProceed
  * A local helper to check if selected node then perform a callback
  */
  checkNodeThenProceed(cb) {
    console.log(this.selectedNode);
    if (!this.selectedNode) {
      const toastData = {
        type: 'warning',
        title: this.langList['move'],
        msg: this.langList['selectItemToExecute'],
        showClose: true,
      };
      this.globalState.notifyMyDataChanged('toasty', '', toastData);

      return false;
    } else {
      cb();
    }
  }

  /**
  * @function openFavExpandSection
  * Open a tcode or expand a section
  */
  openFavExpandSection() {
    if (!this.selectedNode) {
      const toastData = {
        type: 'warning',
        title: this.langList['expandAll'],
        msg: this.langList['selectItemToExecute'],
        showClose: true,
      };
      this.globalState.notifyMyDataChanged('toasty', '', toastData);

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

      const toastData = {
        type: 'success',
        title: this.langList['expandAll'],
        msg: this.langList['actionCompleted'],
        showClose: true,
      };
      this.globalState.notifyMyDataChanged('toasty', '', toastData);
    }
  }

  /**
  * @function showRenameSectionDialog
  * Show section dialog for creating new or renaming section
  *
  * @param {boolean} isRename default is creation of new section
  * @param {TreeNode} node
  */
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
        const toastData = {
          type: 'warning',
          title: this.langList['rename'],
          msg: this.langList['selectItemToExecute'],
          showClose: true,
        };
        this.globalState.notifyMyDataChanged('toasty', '', toastData);

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

  /**
  * @function showRenameItemDialog
  * Show item dialog for creating new or renaming item
  *
  * @param {boolean} isRename default is creation of new item
  * @param {TreeNode} node
  */
  showRenameItemDialog(isRename: boolean = false, node: TreeNode = null) {
    if (!isRename) {
      console.log('New Item');
      this.documentForm.reset();
      this.dialogTitle = this.langList['newItem'];
      this.documentForm = this.fb.group({
        'documentLabel': new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
        'documentIcon': new FormControl('favorite'),
        'documentIcon1': new FormControl(''),
        'documentDesc': new FormControl(''),
        'documentUrl': new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      });
      this.displayDocumentDialog = true;
      this.isRenameDialog = false;
    } else {
      console.log('Rename Item');
      if (!node) {
        const toastData = {
          type: 'warning',
          title: this.langList['rename'],
          msg: this.langList['selectItemToExecute'],
          showClose: true,
        };
        this.globalState.notifyMyDataChanged('toasty', '', toastData);

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
          'documentIcon1': new FormControl(this.selectedNode.data.icon1),
          'documentDesc': new FormControl(this.selectedNode.data.desc),
          'documentUrl': new FormControl(this.selectedNode.data.url, Validators.compose([Validators.required, Validators.minLength(3)])),
        });
        this.displayDocumentDialog = true;
        this.isRenameDialog = true;
      }
    }
  }

  /**
  * @function renameSectionOrItem
  * Rename selected Node, might be Section or Item
  */
  renameSectionOrItem(node: TreeNode = null) {
    if (!node) {
      const toastData = {
        type: 'warning',
        title: this.langList['rename'],
        msg: this.langList['selectItemToExecute'],
        showClose: true,
      };
      this.globalState.notifyMyDataChanged('toasty', '', toastData);

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

  /**
  * @function saveSection
  * Save section into local storage
  */
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

    const toastData = {
      type: 'success',
      title: this.langList['save'],
      msg: this.langList['actionCompleted'],
      showClose: true,
    };
    this.globalState.notifyMyDataChanged('toasty', '', toastData);

    this.displaySectionDialog = false;
  }

  /**
  * @function saveDocument
  * Save Document into local storage
  */
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
            'icon1': this.documentForm.controls.documentIcon1.value,
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
            'icon1': this.documentForm.controls.documentIcon1.value,
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

    const toastData = {
      type: 'success',
      title: this.langList['save'],
      msg: this.langList['actionCompleted'],
      showClose: true,
    };
    this.globalState.notifyMyDataChanged('toasty', '', toastData);

    this.displayDocumentDialog = false;
  }

  /**
  * @function cancelDialog
  * Cancel dialog
  */
  cancelDialog() {
    this.displayMoveDialog = false;
    this.displaySectionDialog = false;
    this.displayDocumentDialog = false;
  }

  /**
  * @function confirmDelete
  * Reconfirm user delete action before proceeding
  */
  confirmDelete() {
    this.msgs = [];

    if (!this.selectedNode) {
      const toastData = {
        type: 'warning',
        title: this.langList['delete'],
        msg: this.langList['selectItemToExecute'],
        showClose: true,
      };
      this.globalState.notifyMyDataChanged('toasty', '', toastData);

      return false;
    }

    if (!this.selectedNode.parent) {
      const toastData = {
        type: 'error',
        title: this.langList['delete'],
        msg: this.langList['rootCanNotBeDeleted'],
        showClose: true,
      };
      this.globalState.notifyMyDataChanged('toasty', '', toastData);

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
              const toastData = {
                type: 'info',
                title: this.langList['cancel'],
                msg: this.langList['actionCancelled'],
                showClose: true,
              };
              this.globalState.notifyMyDataChanged('toasty', '', toastData);
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
              const toastData = {
                type: 'info',
                title: this.langList['cancel'],
                msg: this.langList['actionCancelled'],
                showClose: true,
              };
              this.globalState.notifyMyDataChanged('toasty', '', toastData);
          },
      });
    }
  }

  /**
  * @function deleteNode
  * Delete a node
  *
  * @param {TreeNode} node
  */
  deleteNode(node: TreeNode) {
      node.parent.children = node.parent.children.filter( n => n.data !== node.data);

      const toastData = {
        type: 'success',
        title: this.langList['delete'],
        msg: this.langList['actionCompleted'],
        showClose: true,
      };
      this.globalState.notifyMyDataChanged('toasty', '', toastData);

      this.saveFav2LocalStorage();
  }

  /**
  * @function unselectFile
  * Unselect a document/ file
  */
  unselectFile() {
      this.selectedNode = null;
  }

  /**
  * @function expandAll
  * Expand all nodes in tree
  */
  expandAll() {
      this.favList.forEach( node => {
          this.expandRecursive(node, true);
      } );
  }

  /**
  * @function collapseAll
  * Collapse all nodes in tree
  */
  collapseAll() {
      this.favList.forEach( node => {
          this.expandRecursive(node, false);
      } );
  }

  /**
  * @function expandRecursive
  * Using recursive to expand all children nodes of a node
  *
  * @param {TreeNode} node
  * @param {boolean} isExpand
  */
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

  /**
  * @function saveFav2LocalStorage
  * Save Fav into local storage
  */
  saveFav2LocalStorage() {
    const cleanedList = _.cloneDeep(this.favList);
    // To cleanup the tree and avoid JSON recursive error due to JSON.stringify
    this.cleanRecursive(cleanedList[0]);

    this.localStorageService.setFav(cleanedList);
  }

  /**
  * @function cleanRecursive
  * Clean all _proto for cleaned JSON tree for storing purpose
  */
  private cleanRecursive(node: TreeNode) {
      delete node.parent;
      delete node.expanded;
      if (node.children) {
          node.children.forEach( childNode => {
              this.cleanRecursive(childNode);
          } );
      }
  }

}
