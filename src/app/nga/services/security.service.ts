import { Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

import { TcodeService } from './tcode.service';
import { NavigationService } from './navigation.service';

@Injectable()
export class SecurityService {

  constructor(
    private tcodeService: TcodeService,
    private navigationService: NavigationService,
  ) {
  }

  /****************************************************************************
   * TO CREATE AUTHORIZATION HEADER WITH JWT TOKEN
   ****************************************************************************/
  jwt() {
      // get authorization header with jwt token from localStorage
      const currentUser: any = JSON.parse(localStorage.getItem('currentUser'));
      const awt: string = JSON.stringify(currentUser.awt);
      const token: string = this.getToken();
      console.log(token);
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

  /****************************************************************************
   * SETTER / GETTER FOR SYSTEM SENSITIVE INFORMATION
   * Token
   * currentUser
   * Mana
   ****************************************************************************/

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  setAwt(wkLge: string, wkYear: string) {
    const user = this.getCurrentUser();
    const awt = this.tcodeService.encode_array([wkLge, wkYear]);
    user.awt = awt;
    this.setCurrentUser(JSON.stringify(user));
  }

  getAwt(): string {
    const currentUser: any = JSON.parse(localStorage.getItem('currentUser'));
    const awt = currentUser.awt;
    return awt;
  }

  getWkLge(): string {
    const awt = this.getAwt();
    return this.tcodeService.decode(awt[0]);
  }

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

  setCurrentUser(user: string) {
    localStorage.setItem('currentUser', user);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  setSavedSession(savedSession: string) {
    localStorage.setItem('savedSession', savedSession);
  }

  getSavedSession() {
    return JSON.parse(localStorage.getItem('savedSession'));
  }

  setMana(mana: string) {
    localStorage.setItem('mana', mana);
  }

  getMana(): string[] {
    return (JSON.parse(localStorage.getItem('mana')));
  }

  getDecodedMana(): string[] {
    return this.tcodeService.decode_array(JSON.parse(localStorage.getItem('mana')));
  }
  /****************************************************************************
   * TO LOG OUT AND CLEAN UP SESSION DATA
   ****************************************************************************/
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
