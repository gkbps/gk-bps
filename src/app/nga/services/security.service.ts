import { Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

// GK - Alphabet
import { NavigationService } from './navigation.service';
import { TcodeService } from './tcode.service';

/**
* @module SecurityService
* Service that handle sensitive information processing
*
* @function jwt
* @function setToken
* @function getToken
* @function setAwt
* @function getAwt
* @function getWkLge
* @function getWkYear
* @function setCurrentUser
* @function getCurrentUser
* @function setSavedSession
* @function getSavedSession
* @function setMana
* @function getMana
* @function getDecodedMana
* @function logOut
*/
@Injectable()
export class SecurityService {

  constructor(
    private tcodeService: TcodeService,
    private navigationService: NavigationService,
  ) { }

  /**
  * @function
  * Create Authorization header with JWT token
  */
  jwt() {
    // get authorization header with jwt token from localStorage
    const currentUser: any = JSON.parse(localStorage.getItem('currentUser'));
    const awt: string = JSON.stringify(currentUser.awt);
    const token: string = this.getToken();
    // console.log(token);
    if (currentUser && currentUser.token) {
      const headers = new Headers({
        'authorization': 'Bearer ' + currentUser.token,
        'awt': awt, // Array Web Token
        'usr': currentUser._id,
        'token': token
      });
      return new RequestOptions({ headers: headers });
    }
  }

  /**
  * SETTER / GETTER FOR SYSTEM SENSITIVE INFORMATION
  * Token
  * currentUser
  * Mana
  */

  /**
  * @function setToken
  * Set or update token information into local storage
  *
  * @param {string} token
  */
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  /**
  * @function getToken
  * Get token information from local storage
  */
  getToken(): string {
    return localStorage.getItem('token');
  }

  /**
  * @function setAwt
  * Set or update Awt information into local storage
  *
  * @param {string} wkLge
  * @param {string} wkYear
  */
  setAwt(wkLge: string, wkYear: string) {
    const user = this.getCurrentUser();
    const awt = this.tcodeService.encode_array([wkLge, wkYear]);
    user.awt = awt;
    this.setCurrentUser(JSON.stringify(user));
  }

  /**
  * @function getAwt
  * Get Awt information from local storage
  */
  getAwt(): string {
    const currentUser: any = JSON.parse(localStorage.getItem('currentUser'));
    const awt = currentUser.awt;
    return awt;
  }

  /**
  * @function getWkLge
  * Get WkLge information from local storage
  */
  getWkLge(): string {
    const awt = this.getAwt();
    return this.tcodeService.decode(awt[0]);
  }

  /**
  * @function getWkYear
  * Get WkYear information from local storage
  */
  getWkYear(): string {
    const awt = this.getAwt();
    return this.tcodeService.decode(awt[1]);
  }

  /*
  getClientCode(): string {
    const awt = this.getAwt();
    return this.tcodeService.decode(awt[0]);
  }
  */

  /**
  * @function setCurrentUser
  * Set or update currentUser information into local storage
  *
  * @param {string} user
  */
  setCurrentUser(user: string) {
    localStorage.setItem('currentUser', user);
  }

  /**
  * @function getCurrentUser
  * Get currentUser information from local storage
  */
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  /**
  * @function setSavedSession
  * Set or update savedSession information into local storage
  */
  setSavedSession(savedSession: string) {
    localStorage.setItem('savedSession', savedSession);
  }

  /**
  * @function getSavedSession
  * Get savedSession information from local storage
  */
  getSavedSession() {
    return JSON.parse(localStorage.getItem('savedSession'));
  }

  /**
  * @function getMana
  * Set or update Mana information into local storage
  *
  * @param {string} mana
  */
  setMana(mana: string) {
    localStorage.setItem('mana', mana);
  }

  /**
  * @function getMana
  * Get Mana information from local storage
  */
  getMana(): string[] {
    return (JSON.parse(localStorage.getItem('mana')));
  }

  /**
  * @function getDecodedMana
  * Get Mana information from local storage then decode it for readability
  */
  getDecodedMana(): string[] {
    return this.tcodeService.decode_array(JSON.parse(localStorage.getItem('mana')));
  }

  /**
  * @function logOut
  * Log out system and clean up session data
  */
  logOut() {
    // remove user from local storage to log user out
    localStorage.removeItem('errorHistory');
    localStorage.removeItem('history');
    localStorage.removeItem('mana');
    localStorage.removeItem('currentUser');
    // Becareful of looping in login - this can be managed via Guard
    // this.navigationService.gotoLogin();
  }

}
