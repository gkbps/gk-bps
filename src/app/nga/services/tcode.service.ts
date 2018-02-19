import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

// declare const Buffer;

@Injectable()
export class TcodeService {

  // Tcodes belong this list shall not be under any module
  // then tcode shall execute in vanilla mode
  baseTcodes = [
    'intro', 'login', 'lockscreen', 'register', 'forgot',
    'profile', 'policy', 'help', 'dict',
    'fav', 'terminal', 'setting',
    '401', '403', '404', '500', 'chat',
    'home', 'news', 'main',
    'mine', 'tray',
    'inbox', 'ibx',
    'outbox', 'obx',
    'draft', 'drf',
    'inprogress', 'progress', 'ipg',
    'completed', 'clt',
    'gkm', 'gkcln', 'gksol', 'gktcd',
    'prime',
  ];

  constructor(
    private router: Router,
    private http: Http,
  ) { }

  /*****************************************************************************
   * TO TRANSFORM A TCODE TO BE ACTIONABLE URL
   * tcode = prefixAction = moduleXX
   *
   * Example
   * - extractPrefix(mjeXX)-> mje               return prefix of tcode
   * - extractAction(mjeXX)-> XX                return action of tcode
   * - formEditable(mjeXX) -> true/ false       return if this tcode is 11 or 13
   * - urlLead(mjeXX)      -> /mje/mjeXX        return tcode under its module
   * - urlForm(mjeXX, id)  -> /mje/mjeXX/123    return tcode/id under its module
   * - urlHome(mjeXX)      -> /mje              return
   *****************************************************************************/
  private url = '/';        // Home of application Tcode

  // Extract prefix from tcode
  extractPrefix(tcode: string): string {
    return tcode.substring(0, (tcode.length - 2)).toLowerCase();
  }

  // Extract action from tcode
  extractAction(tcode: string): string {
    return tcode.substring(tcode.length - 2).toLowerCase();
  }

  // editable
  formEditable(tcode: string): boolean {
    const action = this.extractAction(tcode);
    return ((action === '11') || (action === '13'));
  }

  // URL redirect to LEAD or tcode plain without ID
  urlLead(tcode: string): string {
    let nextUrl = '';

    if (this.baseTcodes.includes(tcode.toLowerCase())) {
      nextUrl = this.url + tcode.toLowerCase();
    } else {
      const prefix: string = this.extractPrefix(tcode) + '/';
      nextUrl = this.url + prefix.toLowerCase() + tcode.toLowerCase();
    }
    return nextUrl;
  }

  // URL redirect to Form
  urlForm(tcode: string, value: string): string {
    const urlLead: string = this.urlLead(tcode) + '/';
    return urlLead + value;
  }

  // URL from prefix and action (Current)
  urlCombineTCode(prefix: string, action: string): string {
    return this.urlLead(prefix + action);
    // return this.url + prefix.toLowerCase() + '/' + prefix.toLowerCase() + action;
  }

  // URL from prefix, action and Id (Current)
  urlCombineTCodeAndId(prefix: string, action: string, id: string): string {
    return this.urlForm(prefix + action, id);
    // return this.url + prefix.toLowerCase() + '/' + prefix.toLowerCase() + action + '/' + id;
  }

  // URL redirect to Mainpage of tcode
  urlHome(tcode: string): string {
    if (this.baseTcodes.includes(tcode.toLowerCase())) {
      return this.url + 'home';
    } else {
      return this.url + this.extractPrefix(tcode).toLowerCase();
    }

  }

  /*****************************************************************************
   * TO EXECUTE A TCODE
   *****************************************************************************/
   executeTCode(tcode: string, id: string = '') {
    const targetUrl: string = id
      ? this.urlForm(tcode, id)
      : this.urlLead(tcode);
     console.log(targetUrl);
     this.router.navigate([targetUrl]);
     return false;
   }

   /*****************************************************************************
    * TO EXECUTE A Url
    *****************************************************************************/
    executeUrl(url: string) {
      console.log(url);
      this.router.navigate([url]);
      return false;
    }
  /*****************************************************************************
   * SIMPLE HASH
   * npm i -g typescript@next
   * npm i --save @types/node or
   * npm install --save @types/node
   * for other libraries, install @types/library_name
   *****************************************************************************/

   encode(str: string): string {
     /*
     const sh = new Buffer(str);
     return sh.toString('base64');
     */
     return btoa(str);
   }

   decode(str: string): string {
     /*
     const sh = new Buffer(str, 'base64');
     return sh.toString();
     */
     return atob(str);
   }

   encode_array(arr: string[]): string[] {
     return arr.map((elem, index) => {
       return this.encode(elem);
     });
   }

   decode_array(arr: string[]): string[] {
     return arr.map((elem, index) => {
       return this.decode(elem);
     });
  }

  // Encapsulation of Mana in service for simplification
  checkTcodeInMana(tcode: string): boolean {
    const encodedArray = (JSON.parse(localStorage.getItem('mana')));
    return encodedArray.includes(this.encode(tcode));
  }

  // To avoid multiple read of Mana in checking
  checkTcodeInEncodeArray(tcode: string, encodedArray: string[]): boolean {
    return encodedArray.includes(this.encode(tcode));
  }

}
