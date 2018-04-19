import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AppConfig } from '../../app.config';
import { HttpClientService, SecurityService } from '../../nga/services/';
import { RequestDocument } from './requestDocuments.models';

@Injectable()
export class RequestDocumentsServices {

  suffixUrl = '/requestFiles/';

  constructor(
    private appConfig: AppConfig,
    private httpClientService: HttpClientService,
    private securityService: SecurityService,
  ) { }

  action1x(_id) {
    return this.httpClientService.get(this.suffixUrl + 'list/' + _id, { disableToast: true })
      .map((res) => {
        // console.log(res);
        return res.body.data || {};
      });
  }

  action12(_id) {
    return this.httpClientService.get(this.suffixUrl + 'list/' + _id, { disableToast: true })
      .map((res) => {
        // console.log(res);
        return res.body.data || {};
      });
  }

  /****************************************************************************
   * SEPARATE UPLOAD AND ADD REQUEST FILE TO SUPPORT FILEUPLOAD OPERATION
   * - Update list of uploaded files
   * - Reset fileupload status for new upload
   ****************************************************************************/
  uploadRequestDocument(_id, formData) {
     return this.httpClientService.post(this.suffixUrl + _id, formData, { disableToast: false })
      .map((res) => {
        // console.log(res);
        return res.body.data || {};
      });
  }

  downloadRequestDocument(_id, tcode) {
    return this.httpClientService.post(this.suffixUrl + 'download/' + _id, { tcode: tcode }, { isDeferral: true })
    .map((res) => {
      // console.log(res.body.data);
      const result = Object.assign({}, res.body.data);
      result.data.url = this.appConfig.apiUrl + '/repo/download/' + (result.data.url || {});
      return result;
    });
  }

  addRequestFile(payload) {
    return new Observable((observer) => observer.next(payload))
    .map((_payload) => {
      // console.log(_payload);
      return { type: 'ADD_REQUEST_FILE', _payload };
    });
  }

  // MULTIPLE
  uploadRequestFiles(_id, formData) {
    return this.httpClientService.post(this.suffixUrl + 'upload/' + _id, formData, { disableToast: false });
  }

  action13(_id, desc) {
    return this.httpClientService.put(this.suffixUrl + _id, { desc: desc }, { disableToast: false })
      .map((res) => {
        // console.log(res);
        return res.body.data || {};
      });
  }

  action16(_id) {
    return this.httpClientService.patch(this.suffixUrl + 'mark/' + _id, {}, { disableToast: false })
      .map((res) => {
        // console.log(res);
        return res.body.data || {};
      });
  }

  action17(_id) {
    return this.httpClientService.patch(this.suffixUrl + 'unmark/' + _id, {}, { disableToast: false })
      .map((res) => {
        // console.log(res);
        return res.body.data || {};
      });
  }

  action18(_id) {
    return this.httpClientService.delete(this.suffixUrl + _id, { disableToast: false })
      .map((res) => {
        // console.log(res);
        return res.body.data || {};
      });
  }

}
