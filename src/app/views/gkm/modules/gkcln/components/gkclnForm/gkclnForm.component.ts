import { Component, OnInit, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Message } from 'primeng/components/common/api';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { TranslateService } from '@ngx-translate/core';
import { GlobalState } from '../../../../../../global.state';
import {
  SecurityService,
  TcodeService,
  NavigationService,
  ObjectService,
  APIResultHandlingService,
  LocalStorageService,
} from '../../../../../../nga/services';

import { GkClient } from '../../../../../../store/_models/gkClient.model';
import { GkClientService } from '../../../../../../store/_services/gkClient.service';

/**********************************************************************************************************
 * FORM SERVES INPUT (11, 13) AND VIEW (12, 14, 15, 16, 17, 18)
 * Input tcode = prefix + action;
 * id & client is to determine client document
 * - Create (11)
 *    No id at first, after saving successfully (201) has client = true then no more SAVE button
 * - Other
 *    Id via URL, if client exist (http status 200) hasClient = true to display form for viewing/ editting
 ***********************************************************************************************************/
@Component({
  selector: 'gkclient-form',
  templateUrl: './gkclnForm.html',
  styleUrls: ['./gkclnForm.scss'],
})
export class GkClnForm implements OnInit, OnDestroy {

  myScope = 'gkcln-form';

  @Input() isRequest = false;
  @Input() isEditableRequest = true;
  @Input() tcode: any;
  @Input() client: any;
  @Output() getRequestBodyChange: EventEmitter<any> = new EventEmitter();
  id = '';
  /**
   * To show form details when
   * - action = 11 (before save and after save)
   * - action = 12, 13, 14, 15, 16, 17, 18 only if http return status 200
   */
  hasClient = false;

  prefix = '';
  action = '';

  formEditable = false; // Action 11 (before save) and 13 allow form to be editted
  myForm: FormGroup;

  msgs: Message[] = [];
  debugMode = false;

  industryList = [
    { label:'Select industry', value:null },
    { label:'Pharma', value:'Pharma' },
    { label:'Bank', value:'Bank' },
    { label:'Insurance', value:'Insurance' },
    { label:'FMCG', value:'FMCG' },
    { label:'Financial Services', value:'Financial Services' },
    { label:'Software', value:'Software' },
    { label:'Consulting', value:'Consulting' },
    { label:'IT', value:'IT' },
    { label:'Auto', value:'Auto' },
    { label:'Auditing', value:'Auditing' },
    { label:'Travel Agency', value:'Travel Agency' },
    { label:'Government', value:'Government' },
    { label:'Others', value:'Others' },
    { label:'News Agency', value:'News Agency' },
    { label:'Business & Information', value: 'Business & Information'},
    { label:'Construction/Utilities/Contracting', value: 'Construction/Utilities/Contracting'},
    { label:'Education', value: 'Education'},
    { label:'Finance & Insurance', value: 'Finance & Insurance'},
    { label:'Food & Hospitality', value: 'Food & Hospitality'},
    { label:'Gaming', value: 'Gaming'},
    { label:'Health Services', value: 'Health Services'},
    { label:'Motor Vehicle', value: 'Motor Vehicle'},
    { label:'Natural Resources/Environmental', value: 'Natural Resources/Environmental'},
    { label:'Other', value: 'Other'},
    { label:'Personal Services', value: 'Personal Services'},
    { label:'Real Estate & Housing', value: 'Real Estate & Housing'},
    { label:'Safety/Security & Legal', value: 'Safety/Security & Legal'},
    { label:'Transportation', value: 'Transportation'}
  ];

  serviceList = [
    { label:'Category 1', value: 'Cat 1'},
    { label:'Category 2', value: 'Cat 2'},
    { label:'Category 3', value: 'Cat 3'},
    { label:'Category 4', value: 'Cat 4'},
  ];

  status1List = [
    { label:'Select status', value:null },
    { label:'Active', value:'Active' },
    { label:'Inactive', value:'Inactive' },
  ];

  status2List = [
    { label:'Select mark', value:null },
    { label:'Marked', value:'Marked' },
    { label:'Unmarked', value:'Unmarked' },
  ];

  // Redux based variables
  selectedGkClient: Observable<GkClient>;
  private subscription: Subscription;

  /****************************************************************************
   * INITIALIZATION
   * Constructor
   * ngOnInit
   * parseTCode
   * initBasicModelThenGetData
   * initBasicModel
   ****************************************************************************/
  constructor(
    private activatedRoute: ActivatedRoute,

    private globalState: GlobalState,
    private gkClientService: GkClientService,
    private securityService: SecurityService,
    private navigationService: NavigationService,
    private tcodeService: TcodeService,
    private objectService: ObjectService,
    private apiResultHandlingService: APIResultHandlingService,
    private _fb: FormBuilder,

    private localStorage: LocalStorageService,
    private translateService: TranslateService,
  ) {
  }

  ngOnInit() {
    // Local subscription to global state
    this.subscribeLocalState(); // IMPORTANT: Only from and after OnInit, all input including isRequest is passed to

    this.initBlankModel();
    this.buildForm();

    // Get id
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['id']) {
        this.id = params['id'];
      }
    });
    console.log(this.id);

    // Set blank form (action 11) or form filled with returned data (other actions)
    this.parseTCodeAndExecuteAction();
    this.debugMode = this.localStorage.getDebugMode();
  }

  /**
   * FUNCTION TO INITIALIZE BLANK MODEL (BASIC MODEL)
   */
  initBlankModel() {
    this.client =  {
      name: '',
      clientDb: '',
      industry: '',
      service: '',
      addresses: [],
      contacts: [],
      solutions: [],
      remarks: [],
      status1: 'Active',
      status2: 'Unmarked',
    };
  }

  /**
   * FUNCTION TO PARSE TCODE AND EXECUTE ACTION (FOR INITIAL DATA)
   */
  parseTCodeAndExecuteAction() {
    // Parse TCode - this must be in OnInit or after steps, otherwise no input is parsable
    this.prefix = this.tcodeService.extractPrefix(this.tcode);
    this.action = this.tcodeService.extractAction(this.tcode);
    // console.log('Action:', this.action);

    // Get initial data for ngrx then build form filled with return data
    switch (this.action) {
      case '11':
        this.gkClientService.createBlankItem();
        break;

      case '12':
        this.gkClientService.findById(this.id);
        break;

      case '13':
        this.gkClientService.findById(this.id);
        break;

      case '14':
        this.gkClientService.disable(this.id);
        break;

      case '15':
        this.gkClientService.enable(this.id);
        break;

      case '16':
        this.gkClientService.mark(this.id);
        break;

      case '17':
        this.gkClientService.unmark(this.id);
        break;

      case '18':
        this.gkClientService.delete(this.id);
        break;

      case '31':
        if (!this.id) {
          this.gkClientService.createDataItem({});
        } else {
          this.gkClientService.findOrCreateRequestById(this.id);
        }
        break;

      case '32':
        break;

      case '33':
        break;

      default:
        break;
    }
  }

  /****************************************************************************
   * FORM CONSTRUCTION
   ****************************************************************************/
  private buildForm(): void {

    // Fill form with blank or valid client data
    this.fillForm();

    // Exit here if no client, otherwise continue to elaborate form details
    if (!this.client) { return; }

    // Data Block 1 - Addresses
    const hasAddresses: boolean = this.objectService.hasProp(this.client, 'addresses');
    if (hasAddresses) {
      const countAddresses: number = this.client.addresses.length;
      // console.log(`Number of nested addresses: ${countAddresses}`);
      for (let addressCounter = 0; addressCounter < countAddresses; addressCounter++) {
        const addressControl = <FormArray> this.myForm.controls['addresses'];
        addressControl.push(this.addAddressWithData(this.client.addresses[addressCounter]));
      }
    }

    // Data Block 2 - Contacts
    const hasContacts: boolean = this.objectService.hasProp(this.client, 'contacts');
    if (hasContacts) {
      const countContacts: number = this.client.contacts.length;
      // console.log(`Number of nested contacts: ${countContacts}`);
      for (let contactCounter = 0; contactCounter < countContacts; contactCounter++) {
        const contactControl = <FormArray> this.myForm.controls['contacts'];
        contactControl.push(this.addContactWithData(this.client.contacts[contactCounter]));
      }
    }
  }

  /**
   * Function to initialize form with client data
   */
  private fillForm() {
    this.myForm = this._fb.group({
      _id: [
        {
          value: this.client._id,
          disabled: false
        }
      ],
      name: [ this.client.name,
        [
          Validators.required,
          Validators.minLength(5),
        ],
      ],
      industry: [this.client.industry],
      service: [this.client.service],
      addresses: this._fb.array([]),
      contacts: this._fb.array([]),
      clientDb: [this.client.clientDb,
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9]*$'),       // Alphanumeric
          Validators.minLength(3),
        ]
      ],
      solutions: this._fb.array([]),
      remarks: this._fb.array([]),
      status1: [this.client.status1],
      status2: [this.client.status2],
    });

    // Disable header fiedls, all details fields are disabled via formEditable
    // this.myForm.controls.name.disable();
    // this.myForm.controls.clientDb.disable();

    this.initFormEditable();
  }

  /**
   * Function to determine formEditable at one place
   */
  initFormEditable() {
    this.formEditable = false;

    switch (this.action) {
      case '11':
        this.formEditable = true;
        // this.myForm.controls.name.enable();
        // this.myForm.controls.clientDb.enable();
        break;

      case '13':
        this.formEditable = true;
        // this.myForm.controls.name.enable();
        // this.myForm.controls.clientDb.enable();
        break;

      default:
        if (this.isEditableRequest) {
          this.formEditable = true;
          // this.myForm.controls.name.enable();
          // this.myForm.controls.clientDb.enable();
        }
        break;
    }

  }

  /****************************************************************************
   * ADDRESSES
   ****************************************************************************/

   /**
   * Function to create a blank address (for add new)
   */
   private addAddress() {
    return this._fb.group({
      type: ['',
        [
          Validators.required,
          Validators.minLength(3),
        ]
      ],
      line1: ['',
        [
          Validators.required,
          Validators.minLength(1),
        ]
      ],
      line2: [''],
      line3: [''],
      line4: [''],
      line5: [''],
    });
  }

  /**
   * Function to create an address with data (to insert an existing address into form)
   */
  private addAddressWithData(addressData: any) {
    return this._fb.group({
      type: [addressData.type,
        [
          Validators.required,
          Validators.minLength(3),
        ]
      ],
      line1: [addressData.line1,
        [
          Validators.required,
          Validators.minLength(1),
        ]
      ],
      line2: [addressData.line2],
      line3: [addressData.line3],
      line4: [addressData.line4],
      line5: [addressData.line5],
    });
  }

  newAddress() {
    const control = <FormArray> this.myForm.controls['addresses'];
    control.push(this.addAddress());
  }

  removeAddress(i: number) {
    const control = <FormArray> this.myForm.controls['addresses'];
    control.removeAt(i);
  }

  /****************************************************************************
   * CONTACTS
   ****************************************************************************/

  /**
  * Function to create a blank contact (for add new)
  */
  private addContact() {
    return this._fb.group({
      title: ['',
        [
          Validators.required,
          Validators.minLength(1),
        ]
      ],
      name: ['',
        [
          Validators.required,
          Validators.minLength(1),
        ]
      ],
      phone: ['',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),     // Number Only
        ]
      ],
      email: ['',
        [
          Validators.required,
          Validators.email,                  // Email
        ]
      ],
    });
  }

  /**
   * Function to create a contact with data (to insert an existing contact into form)
   */
  private addContactWithData(contactData: any) {
    return this._fb.group({
      title: [contactData.title,
        [
          Validators.required,
          Validators.minLength(1),
        ]
      ],
      name: [contactData.name,
        [
          Validators.required,
          Validators.minLength(1),
        ]
      ],
      phone: [contactData.phone,
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
        ]
      ],
      email: [contactData.email,
        [
          Validators.required,
          Validators.email,
        ]
      ],
    });
  }

  newContact() {
    const control = <FormArray> this.myForm.controls['contacts'];
    control.push(this.addContact());
  }

  removeContact(i: number) {
    const control = <FormArray> this.myForm.controls['contacts'];
    control.removeAt(i);
  }

  /****************************************************************************
   * REMARKS
   ****************************************************************************/

  /**
   * Function to create a blank remark (for add new)
   */
   private addRemark() {
    return this._fb.group({
      remark: [''],
    });
  }

  /**
   * Function to create a remark with data (to insert an existing remark into form)
   */
  private addRemarkWithData(remarkData: any) {
    return this._fb.group({
      remark: [remarkData],
    });
  }

  newRemark() {
    const control = <FormArray> this.myForm.controls['remarks'];
    control.push(this.addRemark());
  }

  removeRemark(i: number) {
    const control = <FormArray> this.myForm.controls['remarks'];
    control.removeAt(i);
  }

  /****************************************************************************
   * EVENT HANDLERS
   * To handle event emitted from form components
   * - nga-address
   * - nga-contact
   ****************************************************************************/
  handleEvent($event) {
    console.log($event);
    const addresses = <FormArray> this.myForm.controls['addresses'];
    const contacts = <FormArray> this.myForm.controls['contacts'];

    switch ($event['action']) {
      case 'removeAddress':
        addresses.removeAt($event['itemIndex']);
        break;

      case 'removeContact':
        contacts.removeAt($event['itemIndex']);
        break;

      default:
        break;
    }
  }

  /****************************************************************************
   * FORM ACTION
   * Function to save or update form data
   ****************************************************************************/
  submitForm() {
    if (this.myForm.valid) {
      const clientData: any = this.myForm['_value'];
      // console.log(clientData);

      switch (this.action) {
        case '11':
          this.gkClientService.create(this.myForm.value);
          break;

        case '13':
          this.gkClientService.update(this.myForm.value);
          break;

        default:
          break;
      }
    }
  }

  /**
   * API AT FRONTEND TO ALLOW REQUEST MANIPULATION
   */

  updateIsEditableRequest(status) {
    console.log('Change isEditableRequest to: ', status);
    this.isEditableRequest = status;
    this.buildForm();
  }

  saveRequest (action) {
    console.log('Save gkClient Request Form data');
    if (this.myForm.valid) {
      this.gkClientService.updateRequest(this.myForm.value)
      .subscribe((result) => {
        console.log(result);

        this.gkClientService.updateRequestStore(result.body.data);

        this.getRequestBodyChange.emit({
          status: 'OK',
          action: action,
          valid: this.myForm.valid,
          value: this.myForm.value
        });


        // switch (result.status) {
        //   case 'OK':
        //     console.log('Updating Request Main on successful save of requestBody');
        //     this.getRequestBodyChange.emit({
        //       status: 'OK',
        //       action: action,
        //       valid: this.myForm.valid,
        //       value: this.myForm.value
        //     });
        //     break;
        //
        //   case 'Error':
        //     console.log('Updating Request Main on failed save of requestBody');
        //
        //     // this.msgs = [];
        //     // this.msgs.push({severity: 'warning', summary: 'Validation Failed', detail: 'Form Validation Failed'});
        //     // this.globalState.notifyMyDataChanged('notificationMessage', '', this.msgs);
        //
        //     // this.getRequestBodyChange.emit({
        //     //   status: 'Error',
        //     //   valid: this.myForm.valid,
        //     //   value: this.myForm.value
        //     // });
        //     break;
        //
        //   default:
        //     break;
        // }
      })
    } else {
      console.log('Validation Failed');
      this.msgs = [];
      this.msgs.push({severity: 'warn', summary: 'Validation Failed', detail: 'Form Validation Failed'});
      this.globalState.notifyMyDataChanged('notificationMessage', '', this.msgs);
    }
  }

  updateParentOnRequestBody() {
    console.log('Updating Request on the Request Body Data');
    this.getRequestBodyChange.emit({
      valid: this.myForm.valid,
      value: this.myForm.value
    });
  }

  onTabChange(event) {
      // this.msgs = [];
      // this.msgs.push({severity: 'info', summary: 'Tab Expanded', detail: 'Index: ' + event.index});
      // this.globalState.notifyMyDataChanged('notificationMessage', '', this.msgs);
  }

  ngOnDestroy() {
    this.unsubscribeLocalState();
  }

  /* LOCAL STATE */
  subscribeLocalState() {
    this.globalState.subscribeEvent('language', this.myScope, (lang) => {
      console.log(lang);
      this.translateService.use(lang);
    });

    // Redux store
    this.selectedGkClient = this.gkClientService.selectedGkClient;
    this.subscription = this.selectedGkClient
    .subscribe(responseBodyData => {
      if (!this.isRequest) {

        if (this.action === '11') {
          // Blank form ready for creating a new document
          this.initBlankModel();
          this.id = '';
          this.hasClient = true;
          this.buildForm();
        } else {
          if (responseBodyData['_id'] === this.id) { // IMPORTANT: To prevent getting the last Observable item by default
            // Update returned data and build form
            this.hasClient = true;
            this.client = responseBodyData;
            this.buildForm();
          }
        }

      } else {

        if (!responseBodyData['_id']) {
          // Blank form ready for creating a new document
          this.initBlankModel();
          this.id = '';
          this.hasClient = true;
          this.buildForm();
        } else {
          if (responseBodyData['_id'] === this.id) { // IMPORTANT: To prevent getting the last Observable item by default
            // Update returned data and build form
            this.hasClient = true;
            this.client = responseBodyData;
            this.buildForm();
          }
        }

      }

    }, error => {
      console.log(error);
    });
  }

  unsubscribeLocalState() {
    this.globalState.unsubscribeEvent('language', this.myScope);
    this.subscription.unsubscribe();
  }

}
