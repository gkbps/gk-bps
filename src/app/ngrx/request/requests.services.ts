import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpClientService } from '../../nga/services/httpClient.service';
import { SecurityService } from '../../nga/services/security.service';
import { TcodeService } from '../../nga/services/tcode.service';

import { Request } from './requests.models';

@Injectable()
export class RequestsServices {

  suffixUrl = '/gkRequests/';

  constructor(
    private httpClientService: HttpClientService,
    private securityService: SecurityService,
    private tcodeService: TcodeService
  ) { }

  /**
  * @function resetRequest
  * Create a blank request
  *
  * @param {string} tcode
  *
  * @return {Observable} gkRequest
  */
  resetRequest(tcode: string) {
    const user = this.securityService.getCurrentUser();

    const value = {
      tcode: tcode,
      desc: '',
      remark: '',
      status: 'New',
      step: '',

      requestor: {
        fullname: user.lastName + ' ' + user.firstName,
        username: user.username
      },

      owner: [],
      approved: [],

      pic: {
        fullname: '',
        username: ''
      },

      planned: '',
      next: [],
      id: '',
      approval_type: '',
      approval: [],
      docs: []
    };
    value.owner.push(user.username);
    return Observable.of(value);
  }

  action11(gkrequest: any, tcode) {
    return this.httpClientService.post(this.suffixUrl + 'entry', gkrequest, { disableToast: false })
      .map((res) => {
        // res only return id of new document
        gkrequest['_id'] = res.body.data;
        gkrequest['status'] = 'Draft';

        setTimeout(() => {
          this.tcodeService.executeTcode(tcode, res.body.data);
        }, 1000);

        return gkrequest || '';
      });
  }

  action12(_id: string) {
    return this.httpClientService.get(this.suffixUrl + _id, { disableToast: true })
      .map((res) => {
        return res.body.data || {};
      });
  }

  action13(gkrequest: any) {
    return this.httpClientService.put(this.suffixUrl + gkrequest._id, gkrequest, { disableToast: false })
    .map((res) => {
      return res.body.data || {};
    });
  }

  action1x(filter: string, sort: string, first: number, rows: number, tray: string, prefix: string): Observable<any[]> {
    const pagination = {
      filter: filter,
      sort: sort,
      first: first,
      rows: rows,
      tray: tray,
      prefix: prefix
    };

    const reqOptions = {
      disableToast: true,
      params: pagination
    };

    return this.httpClientService.get(this.suffixUrl, reqOptions)
      .map((res) => {
        /* res {
         *  data: Request[],
         *  total: number
         * }
         */
        return res.body || {};
      });
  }

  /**
  * REQUEST OPERATIONS
  * @function submitRequest
  * @function withdrawRequest
  * @function cancelRequest
  * @function returnRequest
  * @function rejectRequest
  * @function approveRequest
  */

  submitRequest(gkrequest: any) {
    return this.httpClientService.put(this.suffixUrl + gkrequest._id + '/submit', gkrequest, { disableToast: false })
    .map((res) => {
      return res.body.data || {};
    });
  }

  withdrawRequest(_id: string) {
    return this.httpClientService.patch(this.suffixUrl + _id + '/withdraw' , {}, { disableToast: false })
      .map((res) => {
        // IMPORTANT: Need to return res with full data for getting status and make alert
        return res.body.data || {};
      });
  }

  cancelRequest(_id: string) {
    return this.httpClientService.patch(this.suffixUrl  + _id + '/cancel', {}, { disableToast: false })
      .map((res) => {
        // IMPORTANT: Need to return res with full data for getting status and make alert
        return res.body.data || {};
      });
  }

  returnRequest(_id: string) {
    return this.httpClientService.patch(this.suffixUrl + _id + '/return' , {}, { disableToast: false })
      .map((res) => {
        // IMPORTANT: Need to return res with full data for getting status and make alert
        return res.body.data || {};
      });
  }

  rejectRequest(_id: string) {
    return this.httpClientService.patch(this.suffixUrl + _id + '/reject' , {}, { disableToast: false })
      .map((res) => {
        // IMPORTANT: Need to return res with full data for getting status and make alert
        return res.body.data || {};
      });
  }

  approveRequest(_id: string, approverId = '', step = '') {
    return this.httpClientService.patch(this.suffixUrl + _id + '/approve' , {}, { disableToast: false })
      .map((res) => {
        // IMPORTANT: Need to return res with full data for getting status and make alert
        return res.body.data || {};
      });
  }

  abortRequest(_id: string) {
    return this.httpClientService.patch(this.suffixUrl + _id + '/abort' , {}, { disableToast: false })
      .map((res) => {
        // IMPORTANT: Need to return res with full data for getting status and make alert
        return res.body.data || {};
      });
  }

  /**
  * REQUEST MANAGEMENT/ ACCOUNTING
  * @function postRequest
  @ @function revertRequest
  * @function createJournal
  * @function postJournal
  * @function revertJournal
  */

  postRequest(_id: string) {
    // : Observable<any>
    return this.httpClientService.patch(this.suffixUrl + _id + '/post' , {}, { disableToast: false })
      .map((res) => {
        // IMPORTANT: Need to return res with full data for getting status and make alert
        return res.body.data || {};
      });
  }

  revertRequest(_id: string) {
    return this.httpClientService.patch(this.suffixUrl + _id + '/revert' , {}, { disableToast: false })
      .map((res) => {
        // IMPORTANT: Need to return res with full data for getting status and make alert
        return res.body.data || {};
      });
  }

  createRequestJournal(_id: string, journal) {
    // : Observable<any>
    return this.httpClientService.post(this.suffixUrl + _id + '/journal/create' , journal, { disableToast: false })
      .map((res) => {
        // IMPORTANT: Need to return res with full data for getting status and make alert
        return res.body.data || {};
      });
  }

  postRequestJournal(_id: string) {
    // : Observable<any>
    return this.httpClientService.patch(this.suffixUrl + _id + '/journal/post' , {}, { disableToast: false })
      .map((res) => {
        // IMPORTANT: Need to return res with full data for getting status and make alert
        return res.body.data || {};
      });
  }

  revertRequestJournal(_id: string) {
    return this.httpClientService.patch(this.suffixUrl + _id + '/journal/revert' , {}, { disableToast: false })
      .map((res) => {
        // IMPORTANT: Need to return res with full data for getting status and make alert
        return res.body.data || {};
      });
  }

  /**
  * REQUEST ADMINISTRATION
  * @function moveRequestApproval
  @ @function moveRequestStatus
  */

  moveRequestApproval(_id, approval) {
    return this.httpClientService.post(this.suffixUrl + _id + '/approval' , approval, { disableToast: false })
      .map((res) => {
        // IMPORTANT: Need to return res with full data for getting status and make alert
        return res.body.data || {};
      });
  }

  moveRequestStatus(_id, status) {
    return this.httpClientService.post(this.suffixUrl + _id + '/approval' , status, { disableToast: false })
      .map((res) => {
        // IMPORTANT: Need to return res with full data for getting status and make alert
        return res.body.data || {};
      });
  }

  /**
  * REQUEST APPROVAL FLOW
  */
  generateApprovalFlow(_id) {
    return this.httpClientService.put(this.suffixUrl + _id + '/approval/generateApprovalFlow', {}, { disableToast: false })
      .map((res) => {
        // IMPORTANT: Need to return res with full data for getting status and make alert
        return res.body.data || {};
      });
  }

  insertApprover(_id, approval, position) {
    return this.httpClientService.put(this.suffixUrl + _id + '/approval/inviteApprover', { approval, position: position }, { disableToast: false })
    // return this.httpClientService.put(this.suffixUrl + _id + '/approval/inviteApprover', { approval, position: position, disableToast: false })
      .map((res) => {
        // IMPORTANT: Need to return res with full data for getting status and make alert
        return res.body.data || {};
      });
  }

  removeApprover(_id, sequence) {
    return this.httpClientService.put(this.suffixUrl + _id + '/approval/removeApprover', { sequence: sequence}, {disableToast: false })
    // return this.httpClientService.put(this.suffixUrl + _id + '/approval/removeApprover', { sequence: sequence, disableToast: false })
      .map((res) => {
        // IMPORTANT: Need to return res with full data for getting status and make alert
        return res.body.data || {};
      });
  }

}
