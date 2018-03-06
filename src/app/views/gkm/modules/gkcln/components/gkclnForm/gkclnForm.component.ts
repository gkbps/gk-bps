import { Component, OnInit, Input, Output, OnDestroy, EventEmitter, ChangeDetectionStrategy, SimpleChanges, OnChanges } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { AbstractControl, FormControl } from '@angular/forms';
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

@Component({
  selector: 'gkclient-form',
  templateUrl: './gkclnForm.html',
  styleUrls: ['./gkclnForm.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GkClnForm implements OnInit, OnDestroy, OnChanges {

  myScope = 'gkcln-form';

  @Input() prefix: any;
  @Input() action: any;
  @Input() isRequest:boolean;
  @Input() isEditable: boolean;

  @Input() source: any;

  @Output() onSaveAction: EventEmitter<any> = new EventEmitter();
  // @Output() onInFormAction: EventEmitter<any> = new EventEmitter();

  isNewCreationSuccess = false;
  isDeletionSuccess = false;

  myForm: FormGroup;
  debugMode = false;
  msgs: Message[] = [];

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
    { label:'Select service', value:null },
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

  constructor(
    private globalState: GlobalState,
    private securityService: SecurityService,
    private navigationService: NavigationService,
    private tcodeService: TcodeService,
    private objectService: ObjectService,
    private apiResultHandlingService: APIResultHandlingService,
    private _fb: FormBuilder,

    private localStorage: LocalStorageService,
    private translateService: TranslateService,
  ) { }

  ngOnInit() {
    // Local subscription to global state
    this.subscribeLocalState(); // IMPORTANT: Only from and after OnInit, all inputs is fully passed to component

    this.debugMode = this.localStorage.getDebugMode();
  }

  ngOnChanges(changes: SimpleChanges) {
    // Persistently monitoring changes of source from ngrx store
    if (changes['source']) {
      console.log(this.source);

      if (this.source) {
        // For Master Data / Transaction - Once transaction completed
        // 11 + id = Create New completed
        if ((this.action=='11') && (this.source.data._id)) {
          this.isNewCreationSuccess = true;
        }
        // 18 + id = Delete completed
        else if((this.action=='18') && (this.source.data._id)) {
          this.isDeletionSuccess = true;
        }
        // For Others: Master Data / Transaction + Request
        else {
          if (!this.source.pending && !this.source.error) {
            this.buildForm();
          }
        }
      }
    }

    if (changes['isEditable']) {
      console.log(this.isEditable);
      // this.buildForm();
    }
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
  }

  unsubscribeLocalState() {
    this.globalState.unsubscribeEvent('language', this.myScope);
  }

  /**
   * FORM CONSTRUCTION
   */
  private buildForm(): void {

    // Fill form with blank or valid client data
    this.myForm = this._fb.group({
      _id: [{ value: this.source.data._id, disabled: false }],
      name: [this.source.data.name, [ Validators.required, Validators.minLength(5) ]],
      industry: [this.source.data.industry],
      service: [this.source.data.service],
      addresses: this._fb.array([]),
      contacts: this._fb.array([]),
      clientDb: [this.source.data.clientDb,
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9]*$'),       // Alphanumeric
          Validators.minLength(3),
        ]
      ],
      solutions: this._fb.array([]),
      remarks: this._fb.array([]),
      status1: [this.source.data.status1],
      status2: [this.source.data.status2],
    });

    // Data Block 1 - Addresses
    const hasAddresses: boolean = this.objectService.hasProp(this.source.data, 'addresses');
    if (hasAddresses) {
      const countAddresses: number = this.source.data.addresses.length;
      // console.log(`Number of nested addresses: ${countAddresses}`);
      for (let addressCounter = 0; addressCounter < countAddresses; addressCounter++) {
        const addressControl = <FormArray> this.myForm.controls['addresses'];
        addressControl.push(this.addAddressWithData(this.source.data.addresses[addressCounter]));
      }
    }

    // Data Block 2 - Contacts
    const hasContacts: boolean = this.objectService.hasProp(this.source.data, 'contacts');
    if (hasContacts) {
      const countContacts: number = this.source.data.contacts.length;
      // console.log(`Number of nested contacts: ${countContacts}`);
      for (let contactCounter = 0; contactCounter < countContacts; contactCounter++) {
        const contactControl = <FormArray> this.myForm.controls['contacts'];
        contactControl.push(this.addContactWithData(this.source.data.contacts[contactCounter]));
      }
    }
  }

  /**
  * ADDRESSES
  * addAddress()                     Create a blank address (for add new)
  * addAddressWithData(addressData)  Create an address with data (to insert an existing address into form)
  * newAddress()                     Add a new address item in addresses array
  * removeAddress()                  Remove an adress item from addresses array
  */
  private addAddress() {
    return this._fb.group({
      type: ['', [ Validators.required, Validators.minLength(3) ]],
      line1: ['', [ Validators.required, Validators.minLength(1) ]],
      line2: [''],
      line3: [''],
      line4: [''],
      line5: [''],
    });
  }

  private addAddressWithData(addressData: any) {
    return this._fb.group({
      type: [addressData.type, [ Validators.required, Validators.minLength(3) ]],
      line1: [addressData.line1, [ Validators.required,Validators.minLength(1) ]],
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

  /**
  * CONTACTS
  * addContact()                     Create a blank contact (for add new)
  * addContactWithData(contactData)  Create a contact with data (to insert an existing contact into form)
  */
  private addContact() {
    return this._fb.group({
      title: ['', [ Validators.required, Validators.minLength(1) ]],
      name: ['', [ Validators.required, Validators.minLength(1) ]],
      phone: ['', [ Validators.required, Validators.pattern('^[0-9]*$') ]],  // Number Only
      email: ['', [ Validators.required, Validators.email ]], // Email
    });
  }

  private addContactWithData(contactData: any) {
    return this._fb.group({
      title: [ contactData.title, [ Validators.required, Validators.minLength(1) ]],
      name: [ contactData.name, [ Validators.required, Validators.minLength(1) ]],
      phone: [ contactData.phone, [ Validators.required, Validators.pattern('^[0-9]*$') ]],
      email: [ contactData.email, [ Validators.required, Validators.email ]],
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

  /**
   * REMARKS
   */

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

  /**
   * EVENT HANDLERS
   * To handle event emitted from form components
   * - nga-address
   * - nga-contact
   *
   */
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

  /**
  * MASTER DATA/ TRANSACTION FORM ACTION
  * @function submitForm
  */
  submitForm() {
    console.log('I am going to emit info via debounceClick!');
    this.onSaveAction.emit({
      valid: this.myForm.valid,
      data: this.myForm.value
    });
  }

  /**
  * REQUEST ACTION
  * @function saveRequest
  */
  saveRequest() {
    console.log('Save gkClient Request Form data');
    if (this.myForm.valid) {
      this.onSaveAction.emit({
        valid: this.myForm.valid,
        data: this.myForm.value
      });
    } else {
      console.log('Validation Failed');
      this.markAllDirty(this.myForm);

      const toastData = {
        type: 'warning',
        title: 'Validation Failed',
        msg: 'Form Validation Failed',
        showClose: true,
      };
      this.globalState.notifyMyDataChanged('toasty','', toastData);
    }
  }

  markAllDirty(control: AbstractControl) {
    if(control.hasOwnProperty('controls')) {
      control.markAsDirty({onlySelf: true}) // mark group
      let ctrl = <any>control;
      for (let inner in ctrl.controls) {
          this.markAllDirty(ctrl.controls[inner] as AbstractControl);
      }
    }
    else {
      (<FormControl>(control)).markAsDirty({onlySelf: true});
    }
  }

  /**
  * UTILITIES
  */
  gotoTcode(tcode) {
    this.tcodeService.executeTCode(tcode,'');
  }

  hasRight(tcode) {
    return this.tcodeService.checkTcodeInMana(tcode);
  }
}
