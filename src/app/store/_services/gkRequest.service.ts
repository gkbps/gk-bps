import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import { AppStore } from '../app.store';

import { HttpClientService } from '../../nga/services/';
import { GkRequest } from '../_models/gkRequest.model';

@Injectable()
export class GkRequestService {

  suffixUrl = '/gkRequests/';

  // Redux based variables
  paginatedGkRequests: Observable<Array<GkRequest>>;
  // gkRequests: Observable<Array<GkRequest>>;
  selectedGkRequest: Observable<GkRequest>;

  constructor(
    private httpClientService: HttpClientService,
    private store: Store<AppStore>
  ) {
    this.paginatedGkRequests = store.select( myStore => myStore.paginatedGkRequests );
    // this.gkRequests = store.select( myStore => myStore.gkRequests );
    this.selectedGkRequest = store.select( myStore => myStore.selectedGkRequest );
  }

  /**************************************************************************************
   * IMPORTANT NOTES
   * - Return: return from httpClientService is the full response with header and body
   * in order to get data by context, remeber to use 'res.body.data'
   *
   * - Return processing: Instead returning the data directly for consuming purpose,
   * it change state of ngrx store redux for a centrally global impact
   **************************************************************************************/

  /**
   * findMasterListPagination
   * the function to lazy paginate the master list to improve system performance.
   *
   * @param {string} filter
   * @param {string} sort
   * @param {number} first
   * @param {number} rows
   * @returns gkRequests[] => ngrx
   * @memberof GkRequestService
   */
  findMasterListPagination(filter: string, sort: string, first: number, rows: number, tray: string) {
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
        return res.body || {};
      })
      .map((payload) => {
        console.log(payload);
        return { type: 'PAGINATE_GKREQUESTS', payload };
      })
      .subscribe((action) => {
        this.store.dispatch(action);
      });
    }

  createBlankItem() {
    const payload = {};
    this.store.dispatch({ type: 'SELECT_GKREQUEST', payload });
  }

  /**
   * findById
   * the function to load a document
   *
   * @param {string} _id
   * @returns gkRequest => ngrx
   * @memberof GkRequestService
   */
  findById(_id: string) {
    return this.httpClientService.get(this.suffixUrl + _id)
      .map((res) => {
        return res.body.data || {};
      })
      .map((payload: GkRequest) => {
        return { type: 'SELECT_GKREQUEST', payload };
      })
      .subscribe((action) => {
        this.store.dispatch(action);
      });
  }

  /**
   * create
   * the function to create a document
   *
   * @param {*} gkRequest
   * @returns gkRequest _id (+gkRequest) => ngrx
   * @memberof GkRequestService
   */
  createNew(gkrequest: any) {
    return this.httpClientService.post(this.suffixUrl + 'createNew', gkrequest)
      .map((res) => {
        return res.body || '';
      })
      .map((resBody) => {
        const payload = JSON.parse(JSON.stringify(gkrequest));
        payload['_id'] = resBody.data; // resBody.data captures the newly created Id

        return { type: 'CREATE_NEW_GKREQUEST', payload };
      })
      .subscribe((action) => {
        this.store.dispatch(action);
      });
  }

  /**
   * update
   * the function to update changes of a document
   *
   * @param {*} gkrequest
   * @returns gkrequest => ngrx
   * @memberof GkRequestService
   */
  update(gkrequest: any) {
    return this.httpClientService.put(this.suffixUrl + gkrequest._id, gkrequest)
    .map((res) => {
      return res.body || {};
    })
    .map((resBody) => {
      const payload = resBody['data'];
      // console.log(payload);
      return { type: 'UPDATE_GKREQUEST', payload };
    })
    .subscribe((action) => {
      this.store.dispatch(action);
    });
  }

  /**
   * submit
   * the function to submit request
   *
   * @param {string} _id
   * @returns gkRequest => ngrx
   * @memberof GkRequestService
   */
   submit(gkrequest: any) {
     return this.httpClientService.put(this.suffixUrl + 'submit/' + gkrequest._id, gkrequest)
     .map((res) => {
       return res.body || {};
     })
     .map((resBody) => {
       const payload = resBody['data'];
       console.log(payload);
       return { type: 'SUBMIT_GKREQUEST', payload };
     })
     .subscribe((action) => {
       this.store.dispatch(action);
     });
   }

   generateApprovalFlow(_id) {
     return this.httpClientService.put(this.suffixUrl + 'generateApprovalFlow/' + _id, {})
       .map((res) => {
         // IMPORTANT: Need to return res with full data for getting status and make alert
         return res.body || {};
       })
       .map((resBody) => {
         const payload = resBody['data']
         console.log(payload);
         return { type: 'GENERATE_APPROVAL_FLOW_GKREQUEST', payload };
       })
       .subscribe((action) => {
         this.store.dispatch(action);
       });
   }
  /**
   * withdraw
   * the function to withdraw
   *
   * @param {string} _id
   * @returns gkRequest => ngrx
   * @memberof GkRequestService
   */
  withdraw(_id: string) {
    return this.httpClientService.patch(this.suffixUrl + 'withdraw/' + _id, {})
      .map((res) => {
        // IMPORTANT: Need to return res with full data for getting status and make alert
        return res.body || {};
      })
      .map((resBody) => {
        const payload = resBody['data'];
        console.log(payload);
        return { type: 'WITHDRAW_GKREQUEST', payload };
      })
      .subscribe((action) => {
        this.store.dispatch(action);
      });
  }

  /**
   * cancel
   * the function to cancel
   *
   * @param {string} _id
   * @returns gkRequest => ngrx
   * @memberof GkRequestService
   */
  cancel(_id: string) {
    return this.httpClientService.patch(this.suffixUrl + 'cancel/' + _id, {})
      .map((res) => {
        // IMPORTANT: Need to return res with full data for getting status and make alert
        return res.body || {};
      })
      .map((resBody) => {
        const payload = resBody['data'];
        console.log(payload);
        return { type: 'CANCEL_GKREQUEST', payload };
      })
      .subscribe((action) => {
        this.store.dispatch(action);
      });
  }

  /**
   * returnRequest
   * the function to return Request
   *
   * @param {string} _id
   * @returns gkRequest => ngrx
   * @memberof GkRequestService
   */
  returnRequest(_id: string) {
    return this.httpClientService.patch(this.suffixUrl + 'returnRequest/' + _id, {})
      .map((res) => {
        // IMPORTANT: Need to return res with full data for getting status and make alert
        return res.body || {};
      })
      .map((resBody) => {
        const payload = resBody['data'];
        console.log(payload);
        return { type: 'RETURN_GKREQUEST', payload };
      })
      .subscribe((action) => {
        this.store.dispatch(action);
      });
  }

  /**
   * cancel
   * the function to cancel
   *
   * @param {string} _id
   * @returns gkRequest => ngrx
   * @memberof GkRequestService
   */
  reject(_id: string) {
    return this.httpClientService.patch(this.suffixUrl + 'reject/' + _id, {})
      .map((res) => {
        // IMPORTANT: Need to return res with full data for getting status and make alert
        return res.body || {};
      })
      .map((resBody) => {
        const payload = resBody['data'];
        console.log(payload);
        return { type: 'REJECT_GKREQUEST', payload };
      })
      .subscribe((action) => {
        this.store.dispatch(action);
      });
  }

  approve(_id: string) {
    return this.httpClientService.patch(this.suffixUrl + 'approve/' + _id, {})
      .map((res) => {
        // IMPORTANT: Need to return res with full data for getting status and make alert
        return res.body || {};
      })
      .map((resBody) => {
        const payload = resBody['data'];
        console.log(payload);
        return { type: 'APPROVE_GKREQUEST', payload };
      })
      .subscribe((action) => {
        this.store.dispatch(action);
      });
  }

  abort(_id: string) {
    return this.httpClientService.patch(this.suffixUrl + 'abort/' + _id, {})
      .map((res) => {
        // IMPORTANT: Need to return res with full data for getting status and make alert
        return res.body || {};
      })
      .map((resBody) => {
        const payload = resBody['data'];
        console.log(payload);
        return { type: 'ABORT_GKREQUEST', payload };
      })
      .subscribe((action) => {
        this.store.dispatch(action);
      });
  }

  /**
   * mark
   * the function to mark status2 of a document
   *
   * @param {string} _id
   * @returns gkRequest => ngrx
   * @memberof GkRequestService
   */
  mark(_id: string) {
    return this.httpClientService.patch(this.suffixUrl + 'mark/' + _id, {})
    .map((res) => {
      // IMPORTANT: Need to return res with full data for getting status and make alert
      return res.body || {};
    })
    .map((resBody) => {
      const payload = JSON.parse(JSON.stringify(resBody.data));
      console.log(payload);

      return { type: 'MARK_GKREQUEST', payload };
    })
    .subscribe((action) => {
      this.store.dispatch(action);
    });
  }

  /**
   * unmark
   * the function to unmark status2 of a document
   *
   * @param {string} _id
   * @returns gkRequest => ngrx
   * @memberof GkRequestService
   */
  unmark(_id: string) {
    return this.httpClientService.patch(this.suffixUrl + 'unmark/' + _id, {})
    .map((res) => {
      // IMPORTANT: Need to return res with full data for getting status and make alert
      return res.body || {};
    })
    .map((resBody) => {
      const payload = JSON.parse(JSON.stringify(resBody.data));
      console.log(payload);

      return { type: 'UNMARK_GKREQUEST', payload };
    })
    .subscribe((action) => {
      this.store.dispatch(action);
    });
  }

  /**
   * delete
   * the function to delete a document
   *
   * @param {string} _id
   * @returns {} => ngrx
   * @memberof GkRequestService
   */
  delete(_id: string) {
    return this.httpClientService.delete(this.suffixUrl + _id)
    .map((res) => {
      // IMPORTANT: Need to return res with full data for getting status and make alert
      return res.body || {};
    })
    .map((resBody) => {
      const payload = {};
      console.log(payload);

      return { type: 'DELETE_GKREQUEST', payload };
    })
    .subscribe((action) => {
      this.store.dispatch(action);
    });
  }
}
