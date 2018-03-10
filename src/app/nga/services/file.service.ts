import { Injectable } from '@angular/core';

import { AppConfig } from '../../app.config';

@Injectable()
export class FileService {

  constructor(
    private appConfig: AppConfig,
  ) {}

  getDownloadPath(filename) {
    const url = this.appConfig.apiUrl + '/repo/download/' + filename;
    console.log(url);
    return url;
   }

  downloadFileByFileName(filename) {
    window.open(this.getDownloadPath(filename));
  }

  downloadFile(path) {
    window.open(path);
  }


}
