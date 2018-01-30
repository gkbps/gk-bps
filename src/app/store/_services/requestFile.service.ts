import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import { AppStore } from '../app.store';

import {
  Http,
} from '@angular/http';

import { SecurityService, HttpClientService } from '../../nga/services/';
import { RequestFile } from '../_models/requestFile.model';

@Injectable()
export class RequestFileService {

  suffixUrl = '/requestFiles/';

  // Redux based variables
  requestFiles: Observable<Array<RequestFile>>;

  constructor(
    private httpClientService: HttpClientService,
    private store: Store<AppStore>,
    private http: Http,
    private securityService: SecurityService,

  ) {
    this.requestFiles = store.select( myStore => myStore.requestFiles );
  }

  /**************************************************************************************
   * IMPORTANT NOTES
   * - Return: return from httpClientService is the full response with header and body
   * in order to get data by context, remeber to use 'res.body.data'
   *
   * - Return processing: Instead returning the data directly for consuming purpose,
   * it change state of ngrx store redux for a centrally global impact
   **************************************************************************************/

  findFilesByRequestId(_id) {
    return this.httpClientService.get(this.suffixUrl + 'list/' + _id)
      .map((res) => {
        console.log(res);
        return res.body.data || {};
      })
      .map((payload) => {
        return { type: 'LOAD_REQUEST_FILES', payload };
      })
      .subscribe((action) => {
        this.store.dispatch(action);
      });
  }

  findFileById(_id) {

  }

  /****************************************************************************
   * SEPARATE UPLOAD AND ADD REQUEST FILE TO SUPPORT FILEUPLOAD OPERATION
   * - Update list of uploaded files
   * - Reset fileupload status for new upload
   ****************************************************************************/
   uploadRequestFile(_id, formData) {
     return this.httpClientService.post(this.suffixUrl + _id, formData);
   }

  addRequestFile(payload) {
    return new Observable((observer) => observer.next(payload))
    .map((payload) => {
      console.log(payload);
      return { type: 'ADD_REQUEST_FILE', payload };
    })
    .subscribe((action) => {
      this.store.dispatch(action);
    });
  }

  // MULTIPLE
  uploadRequestFiles(_id, formData) {
    return this.httpClientService.post(this.suffixUrl + 'upload/' + _id, formData);
  }

  downloadRequestFile(_id) {
    return this.httpClientService.get(this.suffixUrl + 'download/' + _id);
  }

  renameRequestFile(_id, desc) {
    return this.httpClientService.put(this.suffixUrl + _id, {desc: desc})
      .map((res) => {
        console.log(res);
        return res.body.data || {};
      })
      .map((payload) => {
        return { type: 'RENAME_REQUEST_FILE', payload };
      })
      .subscribe((action) => {
        this.store.dispatch(action);
      });
  }

  markRequestFile(_id) {
    return this.httpClientService.patch(this.suffixUrl + 'mark/' + _id, {})
      .map((res) => {
        console.log(res);
        return res.body.data || {};
      })
      .map((payload) => {
        return { type: 'MARK_REQUEST_FILE', payload };
      })
      .subscribe((action) => {
        this.store.dispatch(action);
      });
  }

  unmarkRequestFile(_id) {
    return this.httpClientService.patch(this.suffixUrl + 'unmark/' + _id, {})
      .map((res) => {
        console.log(res);
        return res.body.data || {};
      })
      .map((payload) => {
        return { type: 'UNMARK_REQUEST_FILE', payload };
      })
      .subscribe((action) => {
        this.store.dispatch(action);
      });
  }

  deleteRequestFile(_id) {
    return this.httpClientService.delete(this.suffixUrl + _id)
      .map((res) => {
        console.log(res);
        return res.body.data || {};
      })
      .map((payload) => {
        return { type: 'DELETE_REQUEST_FILE', payload };
      })
      .subscribe((action) => {
        this.store.dispatch(action);
      });
  }

}
