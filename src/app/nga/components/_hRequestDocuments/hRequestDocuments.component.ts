import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { FileUpload } from 'primeng/fileupload';
import { MenuItem } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Message } from 'primeng/components/common/api';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AppConfig } from '../../../app.config';

import { TranslateService } from '@ngx-translate/core';
import { GlobalState } from '../../../global.state';
import {
  SecurityService,
  LocalStorageService,
} from '../../../nga/services';

import { Store } from '@ngrx/store';
import { AppStore } from '../../../store/app.store';

import { GkRequest } from '../../../store/_models/gkRequest.model';
import { GkRequestService } from '../../../store/_services/gkRequest.service';

import { RequestFile } from '../../../store/_models/requestFile.model';
import { RequestFileService } from '../../../store/_services/requestFile.service';

@Component({
  selector: 'h-request-documents',
  templateUrl: './hRequestDocuments.html',
  styleUrls: ['./hRequestDocuments.scss'],
})
export class HRequestDocuments implements OnInit, OnDestroy {

  myScope = 'h-request-files';

  @Input() tcode: string;

  @ViewChild('singleFileUploader') singleFileUploader: FileUpload;
  // @ViewChild(FileUpload) fileUpload;

  id = '';

  requestDocuments: any[];
  selectedDocument: any;

  msgs: Message[] = [];

  // Header columns on the fly
  loading: boolean;
  cols: any[];
  columnOptions: SelectItem[];

  // Pagination
  first = 0;
  rows = 10;
  totalRecords: number;
  multiSortMeta: any;

  // Items of menubar and context menu
  items: MenuItem[];

  // Upload Dialog
  displayUploadDialog = false;
  myUrl = '';
  uploadedFiles: any[] = [];
  myCredential = true;
  maxSize = 1000000;

  // Rename dialog
  displayRenameDialog = false;
  desc = '';

  // Confirmation dialog
  lblConfirm = 'Confirm';
  lblCancel = 'Cancel';

  // Redux based variables
  requestStatus = '';
  selectedGkRequest: Observable<GkRequest>;
  private subscriptionSelectedGkRequest: Subscription;

  requestFiles: Observable<Array<RequestFile>>;
  private subscription: Subscription;

  constructor(
    private appConfig: AppConfig,
    private activatedRoute: ActivatedRoute,

    private globalState: GlobalState,
    private translateService: TranslateService,
    private securityService: SecurityService,

    private localStorageService: LocalStorageService,
    private confirmationService: ConfirmationService,

    private gkRequestService: GkRequestService,
    private requestFileService: RequestFileService,

    private store: Store<AppStore>,
  ) {
    // Local subscription to global state
    this.translateService.use(this.localStorageService.getLang());

    // Derive class constructor
    this.rows = this.localStorageService.getRows();
  }

  ngOnInit() {
    // console.log(this.tcode);
    this.subscribeLocalState(); // IMPORTANT: Can only get Input tcode from and after OnInit

    // Get id
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['id']) {
        this.id = params['id'];
        // console.log(this.id);
        this.requestFileService.findFilesByRequestId(this.id);
        this.myUrl = this.appConfig.apiUrl + '/requestFiles/upload/' + this.id;
      }
    });

    this.initDataTableColumn();
    this.initMenuItems();
  }

  initDataTableColumn() {
    this.translateService.get(['description', 'username', 'size', 'status', 'updated_at'])
      .subscribe((res) => {
        this.cols = [
          { field: 'desc', header: res.description, width: '40%'  },
          { field: 'username', header: res.username, width: '15%'  },
          { field: 'size', header: res.size, width: '15%'},
          { field: 'status', header: res.status, width: '10%'},
          { field: 'updated_at', header: res.updated_at, width: '20%' },
        ];

        this.columnOptions = [];
        for (let i = 0; i < this.cols.length; i++) {
            this.columnOptions.push({ label: this.cols[i].header, value: this.cols[i] });
        }
        // console.log(this.cols, this.columnOptions);
      });
  }

  initMenuItems() {
    this.translateService.get(['upload', 'download', 'rename', 'mark', 'unmark', 'delete'])
      .subscribe((res) => {

        this.items = [
          {
            label: res.upload, icon: 'ui-icon-file-upload',
            command: (event) => {
              this.uploadedFiles = [];
              this.displayUploadDialog = true;
            },
          },
          { separator: true },
          {
            label: res.download, icon: 'ui-icon-file-download',
            command: (event) => {
              if (this.selectedDocument) {
                this.downloadRequestFile();
              } else {
                this.unavailable();
              }
            },
          },
          {
            label: res.rename, icon: 'ui-icon-edit',
            command: (event) => {
              if (this.selectedDocument) {
                this.desc = this.selectedDocument.desc;
                this.displayRenameDialog = true;
              } else {
                this.unavailable();
              }
            }
            // disabled: (this.requestStatus == 'Draft'),
          },
          { separator: true },
          {
            label: res.mark, icon: 'ui-icon-visibility-off',
            command: (event) => this.confirmAction('mark'),
            // disabled: !this.tcodeService.checkTcodeInEncodeArray('gkcln16', this.userRights),
          },
          {
            label: res.unmark, icon: 'ui-icon-visibility',
            command: (event) => this.confirmAction('unmark'),
            // disabled: !this.tcodeService.checkTcodeInEncodeArray('gkcln17', this.userRights),
          },
          { separator: true },
          {
            label: res.delete, icon: 'ui-icon-delete-forever',
            command: (event) => this.confirmAction('delete'),
            // disabled: (this.requestStatus == 'Draft'),
          }
        ];

      });
  }

  ngOnDestroy() {
    this.unsubscribeLocalState();
  }

  /* LOCAL STATE */
  subscribeLocalState() {
    this.globalState.subscribeEvent('language', this.myScope, (lang) => {
      // console.log(lang);
      this.translateService.use(lang);
      this.initDataTableColumn();
      this.initMenuItems();
    });

    // Redux store
    this.selectedGkRequest = this.gkRequestService.selectedGkRequest;
    this.subscriptionSelectedGkRequest = this.selectedGkRequest
      .subscribe(responseBodyData => {
        // console.log(responseBodyData);
        // console.log(responseBodyData);
        this.requestStatus = responseBodyData.status;
      }, error => {
        console.log(error);
      });

    this.requestFiles = this.requestFileService.requestFiles;
    this.subscription = this.requestFiles
      .subscribe(responseBodyData => {
        // console.log(responseBodyData);
        this.requestDocuments = responseBodyData;
      }, error => {
        console.log(error);
      });
  }

  unsubscribeLocalState() {
    this.globalState.unsubscribeEvent('language', this.myScope);
    this.subscription.unsubscribe();
    this.subscriptionSelectedGkRequest.unsubscribe();
  }

  /*****************************************************************************
   * BUG
   * Can not upload multiple files
   * Temporary solution is to allow single file
   * Advantage: Reduce security issue - mass upload
   * Disadvantage: User experience
   *****************************************************************************/
  uploadSingleFileHandler(event) {
    const formData = new FormData();

    if (event.files.length) {
      formData.append('files', event.files[0]);

      this.requestFileService.uploadRequestFile(this.id, formData)
        .subscribe(
          (result) => {
            // Update ngrx-store
            // console.log(result.body);
            this.requestFileService.addRequestFile(result.body.data);

            // Update uploadedFiles list for user awareness
            this.uploadedFiles.push(event.files[0]);
            // console.log(this.uploadedFiles);

            // Clear the cache for new upload
            // this.fileUpload.clear();
            this.singleFileUploader.clear();
          },
          (error) => {
            console.log(error);

            // Clear the cache for new upload
            // this.fileUpload.clear();
            this.singleFileUploader.clear();
          },
          () => { console.log('Subscription is completed'); },
        );
    }
  }

  /*****************************************************************************/

  downloadRequestFile() {
    this.requestFileService.downloadRequestFile(this.selectedDocument._id)
      .subscribe(
        (result) => {
          // console.log(result);
          // const url = this.appConfig.apiUrl + '/repo/download/' + result['body'].data;
          // console.log(url);
          window.open(this.appConfig.apiUrl + '/repo/download/' + result['body'].data);
        },
        (error) => {
          console.log(error);
        },
        () => { console.log('Subscription is completed'); },
      );
  }

  /*****************************************************************************/

  renameRequestFile() {
    if (this.desc !== this.selectedDocument.desc) {
      this.requestFileService.renameRequestFile(this.selectedDocument._id, this.desc);
      this.selectedDocument = null;
    }
    this.displayRenameDialog = false;
    this.desc = '';
  }

  /*****************************************************************************/

  confirmAction(action: string) {
    if (!this.selectedDocument) {
      this.unavailable();
      // this.translateService.get(['invalid_form', 'invalid_form_message'])
      //   .subscribe((res) => {
      //       const toastData = {
      //         type: 'warning',
      //         title: res.invalid_form,
      //         msg: res.invalid_form_message,
      //         showClose: true,
      //       };
      //       this.globalState.notifyMyDataChanged('toasty','', toastData);
      //
      //   });
    } else {
      this.translateService.get([
        'confirmation',
        'wouldYouConfirm',
        'cancel',
        'confirm'
      ])
      .subscribe((res) => {
        this.lblConfirm = res.confirm;
        this.lblCancel = res.cancel;

        this.confirmationService.confirm({
          message: res.wouldYouConfirm,
          header: res.confirmation,
          icon: 'ui-icon-help',
          accept: () => {
            this.executeAction(action);
          },
          reject: () => {
          }
        });
      });
    }
  }

  executeAction(action: string): void {
    if (this.selectedDocument['_id']) {
      switch (action) {
        case 'mark':
          if (this.selectedDocument.status === 'Unmarked') {
            this.requestFileService.markRequestFile(this.selectedDocument._id);
            this.selectedDocument = null;
          } else {
            this.unavailable();
          }
          break;

        case 'unmark':
          if (this.selectedDocument.status === 'Marked') {
            this.requestFileService.unmarkRequestFile(this.selectedDocument._id);
            this.selectedDocument = null;
          } else {
            this.unavailable();
          }
          break;

        case 'delete':
          if (this.requestStatus === 'Draft') {
            this.requestFileService.deleteRequestFile(this.selectedDocument._id);
            this.selectedDocument = null;
          } else {
            this.unavailable();
          }
          break;

        default:
          break;
      }
    }
  }

  unavailable() {
    this.translateService.get(['unavailable', 'unavailable_msg'])
      .subscribe((res) => {
        const toastData = {
          type: 'warning',
          title: res.unavailable,
          msg: res.unavailable_msg,
          showClose: true,
        };
        this.globalState.notifyMyDataChanged('toasty', '', toastData);
      });
  }
}
