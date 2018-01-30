import { Component, OnInit,  OnDestroy } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { GlobalState } from '../../global.state';
import {
  LocalStorageService,
  NavigationService,
  MenuService,

} from '../../nga/services';
import { BaseComponent } from '../base';

// Videogular
import { VgAPI } from 'videogular2/core';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { Subscription } from 'rxjs/Subscription';
import { IDRMLicenseServer } from 'videogular2/streaming';

export interface IMediaStream {
  source: string;
  label: string;
  token?: string;
  licenseServers?: IDRMLicenseServer;
}
export interface IMedia {
    title: string;
    desc: string;
    src: string;
    type: string;
}

@Component({
  templateUrl: 'main.component.html',
  styleUrls: ['main.scss']
})
export class MainComponent extends BaseComponent {

  // Override Base class properties
  pageTitle = 'main';
  sidebarMenuJSONFile = '';
  globalConfig = {
    language: true,
    trackHistory: true,
  };

  currentStream: IMediaStream;
  api: VgAPI;
  video: string;

  streams:IMediaStream[] = [
      {
        label: 'Chapter 1-VOD',
        source: 'http://static.videogular.com/assets/videos/videogular.mp4'
      },
      {
        label: 'DASH: Multi rate Streaming',
        source: 'https://s3.amazonaws.com/_bc_dml/example-content/sintel_dash/sintel_vod.mpd'
      },
      {
        label: 'DASH: Live Streaming',
        source: 'https://24x7dash-i.akamaihd.net/dash/live/900080/dash-demo/dash.mpd'
      },
      {
          label: 'DASH: DRM with Widevine',
          source: 'https://storage.googleapis.com/shaka-demo-assets/angel-one-widevine/dash.mpd',
          licenseServers: {
              'com.widevine.alpha': {
                  serverURL: 'https://widevine-proxy.appspot.com/proxy'
              }
          }
      },
      {
          label: 'HLS: Streaming',
          source: 'https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8'
      },
  ];

  // playlist: Array<IMedia> = [
  //     {
  //         title: 'Pale Blue Dot',
  //         src: 'http://static.videogular.com/assets/videos/videogular.mp4',
  //         type: 'video/mp4'
  //     },
  //     {
  //         title: 'Big Buck Bunny',
  //         src: 'http://static.videogular.com/assets/videos/big_buck_bunny_720p_h264.mov',
  //         type: 'video/mp4'
  //     },
  //     {
  //         title: 'Elephants Dream',
  //         src: 'http://static.videogular.com/assets/videos/elephants-dream.mp4',
  //         type: 'video/mp4'
  //     }
  // ];
  //
  // currentIndex = 0;
  // currentItem: IMedia = this.playlist[ this.currentIndex ];
  // api1: VgAPI;

  constructor(
    // Base class services
    public translateService: TranslateService,
    public globalState: GlobalState,
    public localStorageService: LocalStorageService,
    public navigationService: NavigationService,
    public menuService: MenuService,

    // Derive class services

  ){
    // Base class constructor: Re-injection for inheritance
    super(translateService, globalState, localStorageService, navigationService, menuService);

    // Derive class constructor
  }

  ngOnInit() {
    // Base class initialization
    super.ngOnInit();
    this.subscribeGlobalState();

    // Derive class initialization
    this.initSidebarMenu();
    this.currentStream = this.streams[0];
  }

  onPlayerReady(api:VgAPI) {
    this.api = api;
  }

  onClickStream(stream:IMediaStream) {
    this.api.pause();

    let timer:Subscription = TimerObservable.create(0, 10).subscribe(
      () => {
        this.currentStream = stream;
        timer.unsubscribe();
      }
    );
  }

  searchVideo(event) {

  }

  ngOnDestroy() {
    // Base class destroy
    super.ngOnDestroy();

    // Derive class destroy here
  }

}
