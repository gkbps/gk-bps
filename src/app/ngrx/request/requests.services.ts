import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpClientService, SecurityService } from '../../nga/services/';
import { Request } from './requests.models';

@Injectable()
export class RequestsServices {

  suffixUrl = '/gkRequests/';

  constructor(
    private httpClientService: HttpClientService,
    private securityService: SecurityService,
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
    }
    value.owner.push(user.username);
    return Observable.of(value);
  }

  action11(gkrequest: any) {
    return this.httpClientService.post(this.suffixUrl + 'entry', gkrequest)
      .map((res) => {
        return res.body.data || '';
      });
  }

  action12(_id: string) {
    return this.httpClientService.get(this.suffixUrl + _id)
      .map((res) => {
        return res.body.data || {};
      });
  }

  action13(gkrequest: any) {
    return this.httpClientService.put(this.suffixUrl + gkrequest._id, gkrequest)
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
    return this.httpClientService.put(this.suffixUrl + gkrequest._id + '/submit', gkrequest)
    .map((res) => {
      return res.body.data || {};
    });
  }

  withdrawRequest(_id: string) {
    return this.httpClientService.patch(this.suffixUrl + _id + '/withdraw' , {})
      .map((res) => {
        // IMPORTANT: Need to return res with full data for getting status and make alert
        return res.body.data || {};
      });
  }

  cancelRequest(_id: string) {
    return this.httpClientService.patch(this.suffixUrl  + _id + '/cancel', {})
      .map((res) => {
        // IMPORTANT: Need to return res with full data for getting status and make alert
        return res.body.data || {};
      });
  }

  returnRequest(_id: string) {
    return this.httpClientService.patch(this.suffixUrl + _id + '/return' , {})
      .map((res) => {
        // IMPORTANT: Need to return res with full data for getting status and make alert
        return res.body.data || {};
      });
  }

  rejectRequest(_id: string) {
    return this.httpClientService.patch(this.suffixUrl + _id + '/reject' , {})
      .map((res) => {
        // IMPORTANT: Need to return res with full data for getting status and make alert
        return res.body.data || {};
      });
  }

  approveRequest(_id: string, approverId = '', step = '') {
    return this.httpClientService.patch(this.suffixUrl + _id + '/approve' , {})
      .map((res) => {
        // IMPORTANT: Need to return res with full data for getting status and make alert
        return res.body.data || {};
      });
  }

  abortRequest(_id: string) {
    return this.httpClientService.patch(this.suffixUrl + _id + '/abort' , {})
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
    return this.httpClientService.patch(this.suffixUrl + _id + '/post' , {})
      .map((res) => {
        // IMPORTANT: Need to return res with full data for getting status and make alert
        return res.body.data || {};
      });
  }

  revertRequest(_id: string) {
    return this.httpClientService.patch(this.suffixUrl + _id + '/revert' , {})
      .map((res) => {
        // IMPORTANT: Need to return res with full data for getting status and make alert
        return res.body.data || {};
      });
  }

  createRequestJournal(_id: string, journal) {
    // : Observable<any>
    return this.httpClientService.post(this.suffixUrl + _id + '/journal/create' , journal)
      .map((res) => {
        // IMPORTANT: Need to return res with full data for getting status and make alert
        return res.body.data || {};
      });
  }

  postRequestJournal(_id: string) {
    // : Observable<any>
    return this.httpClientService.patch(this.suffixUrl + _id + '/journal/post' , {})
      .map((res) => {
        // IMPORTANT: Need to return res with full data for getting status and make alert
        return res.body.data || {};
      });
  }

  revertRequestJournal(_id: string) {
    return this.httpClientService.patch(this.suffixUrl + _id + '/journal/revert' , {})
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
    return this.httpClientService.post(this.suffixUrl + _id + '/approval' , approval)
      .map((res) => {
        // IMPORTANT: Need to return res with full data for getting status and make alert
        return res.body.data || {};
      });
  }

  moveRequestStatus(_id, status) {
    return this.httpClientService.post(this.suffixUrl + _id + '/approval' , status)
      .map((res) => {
        // IMPORTANT: Need to return res with full data for getting status and make alert
        return res.body.data || {};
      });
  }

  /**
  * REQUEST APPROVAL FLOW
  */
  generateApprovalFlow(_id) {
    return this.httpClientService.put(this.suffixUrl + _id + '/approval/generateApprovalFlow', {})
      .map((res) => {
        // IMPORTANT: Need to return res with full data for getting status and make alert
        return res.body.data || {};
      });
  }

}
