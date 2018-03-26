import { Router, NavigationEnd } from '@angular/router';
import { Injectable } from '@angular/core';

/**
* @module TcodeService
* Service contains all helpers for Tcode
*
* TO TRANSFORM A TCODE TO BE ACTIONABLE URL
* tcode = prefixAction = moduleXX
*
* @example
* - extractPrefix(mjeXX)-> mje               return prefix of tcode
* - extractAction(mjeXX)-> XX                return action of tcode
* - formEditable(mjeXX) -> true/ false       return if this tcode is 11 or 13
* - urlLead(mjeXX)      -> /mje/mjeXX        return tcode under its module
* - urlForm(mjeXX, id)  -> /mje/mjeXX/123    return tcode/id under its module
* - urlHome(mjeXX)      -> /mje              return
*
* @function extractPrefix
* @function extractAction
*
* @function formEditable
*
* @function urlLead
* @function urlForm
*
* @function urlCombineTCode
* @function urlCombineTCodeAndId
*
* @function urlHome
*
* TO EXECUTE TCODE
*
* @function executeTcode
* @function executeUrl
*
* TO MANIPULATE TCODES
*
* @function encode
* @function decode
*
* @function encode_array
* @function decode_array
*
* @function checkTcodeInMana
* @function checkTcodeInEncodeArray
*/
@Injectable()
export class TcodeService {

  // Below Tcodes shall not be under any module
  // then tcode shall be executed in vanilla mode
  baseTcodes = [
    'blank',
    'intro', 'login', 'lockscreen', 'register', 'forgot',
    'profile', 'policy', 'help', 'dict',
    'fav', 'terminal', 'setting',
    '401', '403', '404', '500', 'chat',
    'debug', 'notification', 'ntfct', 'download',
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

  private url = '/';        // Home of application Tcode

  constructor(
    private router: Router,
  ) {
    // Override the route reuse strategy to refresh current url
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    }

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        // trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
        // if you need to scroll back to top, here is the right place
        window.scrollTo(0,0);
      }
    });
  }

  /**
  * @function extractPrefix
  * Extract prefix from tcode
  *
  * @param {string} tcode
  *
  * @return {string}
  */
  extractPrefix(tcode: string): string {
    return tcode.substring(0, (tcode.length - 2)).toLowerCase();
  }

  /**
  * @function extractPrefix
  * Extract action from tcode
  *
  * @param {string} tcode
  *
  * @return {string}
  */
  extractAction(tcode: string): string {
    return tcode.substring(tcode.length - 2).toLowerCase();
  }

  /**
  * @function formEditable
  * Check if form is editable based on passed tcode
  *
  * @param {string} tcode
  *
  * @return {boolean}
  */
  formEditable(tcode: string): boolean {
    const action = this.extractAction(tcode);
    return ((action === '11') || (action === '13'));
  }

  /**
  * @function urlLead
  * Return the urlLead of tcode
  * URL redirect to LEAD or tcode plain without ID
  *
  * @param {string} tcode
  *
  * @return {string}
  */
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

  /**
  * @function urlForm
  * Return the urlForm of tcode
  * URL redirect to Form
  *
  * @param {string} tcode
  *
  * @return {string}
  */
  urlForm(tcode: string, value: string): string {
    const urlLead: string = this.urlLead(tcode) + '/';
    return urlLead + value;
  }

  /**
  * @function urlCombineTCode
  * Return the urlLead by combining prefix and action
  *
  * @param {string} prefix
  * @param {string} action
  *
  * @return {string}
  */
  urlCombineTCode(prefix: string, action: string): string {
    return this.urlLead(prefix + action);
    // return this.url + prefix.toLowerCase() + '/' + prefix.toLowerCase() + action;
  }

  /**
  * @function urlCombineTCodeAndId
  * Return the urlForm by combining prefix, action and Id
  *
  * @param {string} prefix
  * @param {string} action
  * @param {string} id
  *
  * @return {string}
  */
  urlCombineTCodeAndId(prefix: string, action: string, id: string): string {
    return this.urlForm(prefix + action, id);
    // return this.url + prefix.toLowerCase() + '/' + prefix.toLowerCase() + action + '/' + id;
  }

  /**
  * @function urlHome
  * Return the urlHome of tcode
  *
  * @param {string} tcode
  *
  * @return {string}
  */
  urlHome(tcode: string): string {
    if (this.baseTcodes.includes(tcode.toLowerCase())) {
      return this.url + 'home';
    } else {
      return this.url + this.extractPrefix(tcode).toLowerCase();
    }

  }

  /**
  * @function executeTcode
  * Execute a Tcode
  *
  * @param {string} tcode
  * @param {string} id
  */
  executeTcode(tcode: string, id: string = '') {
    const targetUrl: string = id
      ? this.urlForm(tcode, id)
      : this.urlLead(tcode);
     console.log(targetUrl);
     this.router.navigate([targetUrl]);
     return false;
  }

  /**
  * @function executeUrl
  * Excute an URL
  *
  * @param {string} url
  */
  executeUrl(url: string) {
    console.log(url);
    this.router.navigate([url]);
    return false;
  }

  /**
  * SIMPLE HASH
  * npm i -g typescript@next
  * npm i --save @types/node or
  * npm install --save @types/node
  * for other libraries, install @types/library_name
  */

  /**
  * @function encode
  * Encode a string
  *
  * @param {string} str
  *
  * @return {string}
  */
  encode(str: string): string {
    /*
    const sh = new Buffer(str);
    return sh.toString('base64');
    */
    return btoa(str);
  }

  /**
  * @function decode
  * Decode a string
  *
  * @param {string} str
  *
  * @return {string}
  */
  decode(str: string): string {
   /*
   const sh = new Buffer(str, 'base64');
   return sh.toString();
   */
   return atob(str);
  }

  /**
  * @function encode_array
  * Encode an array of string
  *
  * @param {array<string>} arr
  *
  * @return {array<string>}
  */
  encode_array(arr: string[]): string[] {
    return arr.map((elem, index) => {
      return this.encode(elem);
    });
  }

  /**
  * @function decode_array
  * Decode an array of string
  *
  * @param {array<string>} arr
  *
  * @return {array<string>}
  */
  decode_array(arr: string[]): string[] {
    return arr.map((elem, index) => {
      return this.decode(elem);
    });
  }

  /**
  * @function checkTcodeInMana
  * Check if a tcode exists in Mana (array of tcodes)
  *
  * @param {string} tcode
  *
  * @return {boolean}
  */
  checkTcodeInMana(tcode: string): boolean {
    const encodedArray = (JSON.parse(localStorage.getItem('mana')));
    return encodedArray.includes(this.encode(tcode));
  }

  //
  /**
  * @function checkTcodeInEncodeArray
  * Check if a tcode exists in Mana (array of tcodes)
  * To avoid multiple read of Mana in checking
  *
  * @param {string} tcode
  * @param {array<string>} encodedArray
  *
  * @return {boolean}
  */
  checkTcodeInEncodeArray(tcode: string, encodedArray: string[]): boolean {
    return encodedArray.includes(this.encode(tcode));
  }

}
