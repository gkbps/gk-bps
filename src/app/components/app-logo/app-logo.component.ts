import { Component } from '@angular/core';

/**
* @module AppLogoComponent
* Logo of the App
*/
@Component({
  /**
  * https://angular.io/guide/styleguide#style-05-03
  * Use Components as elements
  * selector: '[component]'
  * <div component></div>
  */
  selector: '[app-logo]',
  templateUrl: './app-logo.component.html'
})
export class AppLogoComponent { }
