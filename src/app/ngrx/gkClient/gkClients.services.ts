import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpClientService } from '../../nga/services/';
import { GkClient } from './gkClients.models';

@Injectable()
export class GkClientsServices {

  suffixUrl = '/gkclients/';

  constructor(
    private httpClientService: HttpClientService,
  ) {
  }

  /* ------------------------------------------------------------------------
   * MASTER DATA
   * ------------------------------------------------------------------------ */

  findMasterListPagination(filter: string, sort: string, first: number, rows: number): Observable<any[]> {
    const pagination = {
      filter: filter,
      sort: sort,
      first: first,
      rows: rows
    };

    const reqOptions = {
      params: pagination
    };

    return this.httpClientService.get(this.suffixUrl + '/masterListPagination', reqOptions)
      .map((res) => {
        /* res {
         *  data: GkClient[],
         *  total: number
         * }
         */
        return res.body || {};
      });
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

  update(gkrequest: any) {
    return this.httpClientService.put(this.suffixUrl + gkrequest._id, gkrequest)
    .map((res) => {
      return res.body.data || {};
    });
  }

  enable(_id: string) {
    return this.httpClientService.patch(this.suffixUrl + 'enable/' + _id, {})
    .map((res) => {
      // IMPORTANT: Need to return res with full data for getting status and make alert
      return res.body || {};
    });
  }

  disable(_id: string) {
    return this.httpClientService.patch(this.suffixUrl + 'disable/' + _id, {})
    .map((res) => {
      // IMPORTANT: Need to return res with full data for getting status and make alert
      return res.body || {};
    });
  }

  mark(_id: string) {
    return this.httpClientService.patch(this.suffixUrl + 'mark/' + _id, {})
    .map((res) => {
      // IMPORTANT: Need to return res with full data for getting status and make alert
      return res.body || {};
    });
  }

  unmark(_id: string) {
    return this.httpClientService.patch(this.suffixUrl + 'unmark/' + _id, {})
    .map((res) => {
      // IMPORTANT: Need to return res with full data for getting status and make alert
      return res.body || {};
    });
  }

  delete(_id: string) {
    return this.httpClientService.delete(this.suffixUrl + _id)
    .map((res) => {
      // IMPORTANT: Need to return res with full data for getting status and make alert
      return res.body || {};
    });
  }

  /* ------------------------------------------------------------------------
   * REQUEST
   * ------------------------------------------------------------------------ */

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
