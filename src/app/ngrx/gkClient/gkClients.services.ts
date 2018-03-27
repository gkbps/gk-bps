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

  createBlankItem() {
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
    };
    return Observable.of(value);
  }

  /**
  * Action 1x - Individual
  */

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

  // TODO
  action19(_id: string) {
    // return this.httpClientService.get(this.suffixUrl + _id + '/changes')
    // .map((res) => {
    //   // IMPORTANT: Need to return res with full data for getting status and make alert
    //   return res.body.data || {};
    // });
  }

  /**
  * Action 2x - Collective
  * NOTE
  * - Do not use neither ngrx store nor service
  * - Upload 21, 23, 24, 25, 26, 27, 28 - Http called directly in Upload component
  * - Download 22 -  - Http called directly in Download component
  * - Changes 29 -  - Http called directly in History component
  */


  /**
  * Action 3x - Request
  *
  * action3x
  * @function action32 - get Module Request
  * @function action33 - save Module Request
  * action39
  * action41 - N/A
  * @function action42 - post Module Request
  * @function action43 - revert Module Request
  */

  action32(_id) {
    return this.httpClientService.get(this.suffixUrl + 'requests/' + _id)
      .map((res) => {
        return res.body.data || {};
      });
  }

  action33(request) {
    return this.httpClientService.put(this.suffixUrl + 'requests/' + request._id, request)
      .map((res) => {
        return res.body.data || {};
      });
  }

  action42(_id) {
    return this.httpClientService.patch(this.suffixUrl + 'requests/' + _id + '/post', {})
      .map((res) => {
        return res.body.data || {};
      });
  }

  action43(_id) {
    return this.httpClientService.patch(this.suffixUrl + 'requests/' + _id + '/revert', {})
      .map((res) => {
        return res.body.data || {};
      });
  }

  /**
  * Action 5x - Dashboard
  */

  action5x(filter: string, sort: string, first: number, rows: number): Observable<any[]> {
    const pagination = {
      filter: filter,
      sort: sort,
      first: first,
      rows: rows
    };

    const reqOptions = {
      params: pagination
    };

    return this.httpClientService.get(this.suffixUrl + 'dashboard', reqOptions)
      .map((res) => {
        /* res {
         *  data: GkClient[],
         *  total: number
         * }
         */
        return res.body || {};
      });
  }

  /**
  * Action 6x - Summary Report
  */

  action6x(filter: string, sort: string, first: number, rows: number): Observable<any[]> {
    const pagination = {
      filter: filter,
      sort: sort,
      first: first,
      rows: rows
    };

    const reqOptions = {
      params: pagination
    };

    return this.httpClientService.get(this.suffixUrl + 'reports/summary', reqOptions)
      .map((res) => {
        /* res {
         *  data: GkClient[],
         *  total: number
         * }
         */
        return res.body || {};
      });
  }

  /**
  * Action 7x - Detail Report
  */

  action7x(filter: string, sort: string, first: number, rows: number): Observable<any[]> {
    const pagination = {
      filter: filter,
      sort: sort,
      first: first,
      rows: rows
    };

    const reqOptions = {
      params: pagination
    };

    return this.httpClientService.get(this.suffixUrl + 'reports/detail', reqOptions)
      .map((res) => {
        /* res {
         *  data: GkClient[],
         *  total: number
         * }
         */
        return res.body || {};
      });
  }
  /*
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
  */
}
