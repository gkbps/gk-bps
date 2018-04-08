import { Injectable } from '@angular/core';

import { AppConfig } from '../../app.config';

/**
* @module FileService
* Service to handle file
*
* @function getDownloadPath
* @function downloadFileByFileName
* @function downloadFile
*/
@Injectable()
export class FileService {

  constructor(
    private appConfig: AppConfig,
  ) { }

  /**
  * @function getDownloadPath
  * Generate url path of a file for download
  *
  * @param filename
  *
  * @return {string}
  */
  getDownloadPath(filename) {
    const url = this.appConfig.apiUrl + '/repo/download/' + filename;
    // console.log(url);
    return url;
  }

  /**
  * @function downloadFileByFileName
  * Download a file via open new window using file name
  *
  * @param filename
  */
  downloadFileByFileName(filename) {
    window.open(this.getDownloadPath(filename));
  }

  /**
  * @function downloadFile
  * Download a file via open new window using file path
  *
  * @param path
  */
  downloadFile(path) {
    window.open(path);
  }


}
