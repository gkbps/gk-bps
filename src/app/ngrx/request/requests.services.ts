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
  ) {
  }

  /* ------------------------------------------------------------------------
   * MASTER DATA
   * ------------------------------------------------------------------------ */

  findMasterListPagination(filter: string, sort: string, first: number, rows: number, tray: string): Observable<any[]> {
    const pagination = {
      filter: filter,
      sort: sort,
      first: first,
      rows: rows,
      tray: tray
    };

    const reqOptions = {
      params: pagination
    };

    return this.httpClientService.get(this.suffixUrl + '/masterListPagination', reqOptions)
      .map((res) => {
        /* res {
         *  data: Request[],
         *  total: number
         * }
         */
        return res.body || {};
      });
  }

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

  findById(_id: string) {
    return this.httpClientService.get(this.suffixUrl + _id)
      .map((res) => {
        return res.body.data || {};
      });
  }

  createNew(gkrequest: any) {
    return this.httpClientService.post(this.suffixUrl + 'createNew', gkrequest)
      .map((res) => {
        return res.body.data || '';
      });
  }

  updateRequest(gkrequest: any) {
    return this.httpClientService.put(this.suffixUrl + gkrequest._id, gkrequest)
    .map((res) => {
      return res.body.data || {};
    });
  }

  /* ------------------------------------------------------------------------
   * REQUEST
   * ------------------------------------------------------------------------ */

  submitRequest(gkrequest: any) {
    return this.httpClientService.put(this.suffixUrl + 'submit/' + gkrequest._id, gkrequest)
    .map((res) => {
      return res.body.data || {};
    });
  }

  withdrawRequest(_id: string) {
    return this.httpClientService.patch(this.suffixUrl + 'withdraw/' + _id, {})
      .map((res) => {
        // IMPORTANT: Need to return res with full data for getting status and make alert
        return res.body.data || {};
      });
  }

  cancelRequest(_id: string) {
    return this.httpClientService.patch(this.suffixUrl + 'cancel/' + _id, {})
      .map((res) => {
        // IMPORTANT: Need to return res with full data for getting status and make alert
        return res.body.data || {};
      });
  }

  returnRequest(_id: string) {
    return this.httpClientService.patch(this.suffixUrl + 'returnRequest/' + _id, {})
      .map((res) => {
        // IMPORTANT: Need to return res with full data for getting status and make alert
        return res.body.data || {};
      });
  }

  approveRequest(_id: string, approverId = '', step = '') {
    return this.httpClientService.patch(this.suffixUrl + 'approve/' + _id, {})
      .map((res) => {
        // IMPORTANT: Need to return res with full data for getting status and make alert
        return res.body.data || {};
      });
  }

  rejectRequest(_id: string) {
    return this.httpClientService.patch(this.suffixUrl + 'reject/' + _id, {})
      .map((res) => {
        // IMPORTANT: Need to return res with full data for getting status and make alert
        return res.body.data || {};
      });
  }

  abortRequest(_id: string) {
    return this.httpClientService.patch(this.suffixUrl + 'abort/' + _id, {})
      .map((res) => {
        // IMPORTANT: Need to return res with full data for getting status and make alert
        return res.body.data || {};
      });
  }

  postRequest(_id: string) {
    // : Observable<any>
    return this.httpClientService.patch(this.suffixUrl + 'post/' + _id, {})
      .map((res) => {
        // IMPORTANT: Need to return res with full data for getting status and make alert
        return res.body.data || {};
      });
  }

  revertRequest(_id: string) {
    return this.httpClientService.patch(this.suffixUrl + 'revert/' + _id, {})
      .map((res) => {
        // IMPORTANT: Need to return res with full data for getting status and make alert
        return res.body.data || {};
      });
  }

  generateApprovalFlow(_id) {
    return this.httpClientService.put(this.suffixUrl + 'generateApprovalFlow/' + _id, {})
      .map((res) => {
        // IMPORTANT: Need to return res with full data for getting status and make alert
        return res.body.data || {};
      });
  }
}
