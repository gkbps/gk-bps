import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpClientService } from '../../nga/services/';
import { GkClient } from './gkClients.models';

@Injectable()
export class GkClientsServices {

  suffixUrl = '/gkclients/';

  constructor(
    private httpClientService: HttpClientService,
  ) {}

  /**
  * Individual - CRUD
  */

  createBlankItem(){
    const value = {
      name: '',
      clientDb: '',
      industry: '',
      service: '',
      addresses: [],
      contacts: [],
      solutions: [],
      remarks: [],
      status1: 'Active',
      status2: 'Unmarked'
    }
    return Observable.of(value);
  }

  action1x(filter: string, sort: string, first: number, rows: number): Observable<any[]> {
    const pagination = {
      filter: filter,
      sort: sort,
      first: first,
      rows: rows
    };

    const reqOptions = {
      params: pagination
    };

    return this.httpClientService.get(this.suffixUrl, reqOptions)
      .map((res) => {
        /* res {
         *  data: GkClient[],
         *  total: number
         * }
         */
        return res.body || {};
      });
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

  action14(_id: string) {
    return this.httpClientService.patch(this.suffixUrl + _id + '/disable' , {})
    .map((res) => {
      // IMPORTANT: Need to return res with full data for getting status and make alert
      return res.body.data || {};
    });
  }

  action15(_id: string) {
    return this.httpClientService.patch(this.suffixUrl + _id + '/enable' , {})
    .map((res) => {
      // IMPORTANT: Need to return res with full data for getting status and make alert
      return res.body.data || {};
    });
  }

  action16(_id: string) {
    return this.httpClientService.patch(this.suffixUrl + _id + '/mark' , {})
    .map((res) => {
      // IMPORTANT: Need to return res with full data for getting status and make alert
      return res.body.data || {};
    });
  }

  action17(_id: string) {
    return this.httpClientService.patch(this.suffixUrl + _id + '/unmark' , {})
    .map((res) => {
      // IMPORTANT: Need to return res with full data for getting status and make alert
      return res.body.data || {};
    });
  }

  action18(_id: string) {
    return this.httpClientService.delete(this.suffixUrl + _id)
    .map((res) => {
      // IMPORTANT: Need to return res with full data for getting status and make alert
      return res.body.data || {};
    });
  }

  /**
  * Request
  */

  getModuleRequest(_id) {
    return this.httpClientService.get(this.suffixUrl + 'requests/' + _id)
      .map((res) => {
        return res.body.data || {};
      });
  }

  saveModuleRequest(request) {
    return this.httpClientService.put(this.suffixUrl + 'requests/' + request._id, request)
      .map((res) => {
        return res.body.data || {};
      });
  }

  postModuleRequest(_id) {
    return this.httpClientService.patch(this.suffixUrl + 'requests/' + _id + '/post', {})
      .map((res) => {
        return res.body.data || {};
      });
  }

  revertModuleRequest(_id) {
    return this.httpClientService.patch(this.suffixUrl + 'requests/' + _id + '/revert', {})
      .map((res) => {
        return res.body.data || {};
      });
  }


  submit(gkrequest: any) {
    return this.httpClientService.put(this.suffixUrl + 'submit/' + gkrequest._id, gkrequest)
    .map((res) => {
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

  withdraw(_id: string) {
    return this.httpClientService.patch(this.suffixUrl + 'withdraw/' + _id, {})
      .map((res) => {
        // IMPORTANT: Need to return res with full data for getting status and make alert
        return res.body.data || {};
      });
  }

  cancel(_id: string) {
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

  reject(_id: string) {
    return this.httpClientService.patch(this.suffixUrl + 'reject/' + _id, {})
      .map((res) => {
        // IMPORTANT: Need to return res with full data for getting status and make alert
        return res.body.data || {};
      });
  }

  approve(_id: string) {
    return this.httpClientService.patch(this.suffixUrl + 'approve/' + _id, {})
      .map((res) => {
        // IMPORTANT: Need to return res with full data for getting status and make alert
        return res.body.data || {};
      });
  }

  abort(_id: string) {
    return this.httpClientService.patch(this.suffixUrl + 'abort/' + _id, {})
      .map((res) => {
        // IMPORTANT: Need to return res with full data for getting status and make alert
        return res.body.data || {};
      });
  }

}
