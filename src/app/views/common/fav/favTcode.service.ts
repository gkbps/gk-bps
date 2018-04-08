import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { LocalStorageService } from '../../../nga/services';

@Injectable()
export class FavTcodeService {

    constructor(
      private http: Http,
      private localStorageService: LocalStorageService
    ) {}

    files = {
        'data':
        [
            {
                data: {
                    label: 'FAVORITES',
                    icon: 'menu',
                    desc: 'Hellow',
                    url: 'tcode',
                    type: 'section',
                },
                children : [
                    {
                        data: {
                            label: '1-RESEARCH TO DEVELOP',
                            icon: 'menu',
                            desc: 'Hellow',
                            url: 'tcode',
                            type: 'section',
                        },
                        children: [
                            {
                                data: {
                                    label:  'File 09',
                                    icon: 'subject',
                                    desc: 'Hellow',
                                    url: 'tcode',
                                    flag: true,
                                    type: 'tcode',
                                },
                            },
                            {
                                data: {
                                  label: 'File 06',
                                  icon: 'subject',
                                  desc: 'Hellow',
                                  url: 'tcode',
                                  flag: false,
                                  type: 'tcode',
                                },
                            },
                            {
                                data: {
                                  label:  'File 08',
                                  icon: 'subject',
                                  desc: 'Hellow',
                                  url: 'tcode',
                                  preparer: 'HGK',
                                  reviewer: 'HTD',
                                  flag: true,
                                  type: 'tcode',
                                },
                            },

                        ],
                    },
                    {
                        data: {
                            label: '2-MARKET TO PROMOTE',
                            icon: 'menu',
                            desc: 'Hellow',
                            url: 'tcode',
                            type: 'section',
                        },
                        children: [
                            {
                                data: {
                                    label: 'Section 1230',
                                    icon: 'menu',
                                    desc: 'Hellow',
                                    url: 'tcode',
                                    type: 'section',
                                },
                                children: [
                                    {
                                        data: {
                                            label:  '1236',
                                            icon: 'subject',
                                            desc: 'Hellow',
                                            url: 'tcode',
                                            type: 'tcode',
                                        },
                                    },
                                ],
                            },
                            {
                                data: {
                                    label:  'Section 1210',
                                    icon: 'menu',
                                    desc: 'Hellow',
                                    url: 'tcode',
                                    type: 'section',
                                },
                                children: [
                                    {
                                        data: {
                                            label:  '1216',
                                            icon: 'subject',
                                            desc: 'Hellow',
                                            url: 'tcode',
                                            flag: true,
                                            type: 'tcode',
                                        },
                                    },
                                    {
                                        data: {
                                            label:  'File 11',
                                            icon: 'subject',
                                            desc: 'Hellow',
                                            url: 'tcode',
                                            flag: false,
                                            type: 'tcode',
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        data: {
                            label:  '3-PROCURE TO PAY',
                            icon: 'menu',
                            desc: 'Hellow',
                            url: 'tcode',
                            type: 'section',
                        },
                    },
                    {
                        data: {
                            label:  'File 11',
                            icon: 'subject',
                            desc: 'Hellow',
                            url: 'tcode',
                            flag: true,
                            type: 'tcode',
                        },
                    },
                    {
                        data: {
                            label:  '4-PLAN TO MANUFACTURE',
                            icon: 'menu',
                            desc: 'Hellow',
                            url: 'tcode',
                            type: 'section',
                        },
                        children: [
                            {
                                data: {
                                    label:  'File 09',
                                    icon: 'subject',
                                    desc: 'Hellow',
                                    url: 'tcode',
                                    flag: true,
                                    type: 'tcode',
                                },
                            },
                            {
                                data: {
                                  label:  'File 06',
                                  icon: 'subject',
                                  desc: 'Hellow',
                                  url: 'tcode',
                                  flag: true,
                                  type: 'tcode',
                                },
                            },
                            {
                                data: {
                                  label:  'File 08',
                                  icon: 'subject',
                                  desc: 'Hellow',
                                  url: 'tcode',
                                  flag: true,
                                  type: 'tcode',
                                },
                            },

                        ],
                    },
                    {
                        data: {
                            label:  '5-DEMAND TO CASH',
                            icon: 'menu',
                            desc: 'Hellow',
                            url: 'tcode',
                            type: 'section',
                        },
                        children: [
                            {
                                data: {
                                    label:  'Section 1230',
                                    icon: 'menu',
                                    desc: 'Hellow',
                                    url: 'tcode',
                                    type: 'section',
                                },
                                children: [
                                    {
                                        data: {
                                            label:  'File 14',
                                            icon: 'subject',
                                            desc: 'Hellow',
                                            url: 'tcode',
                                            flag: false,
                                            type: 'tcode',
                                        },
                                    },
                                ],
                            },
                            {
                                data: {
                                    label:  'Section 1210',
                                    icon: 'menu',
                                    desc: 'Hellow',
                                    url: 'tcode',
                                    type: 'section',
                                },
                                children: [
                                    {
                                        data: {
                                            label:  'File 18',
                                            icon: 'subject',
                                            desc: 'Hellow',
                                            url: 'tcode',
                                            flag: true,
                                            type: 'tcode',
                                        },
                                    },
                                    {
                                        data: {
                                            label:  'File 18',
                                            icon: 'subject',
                                            desc: 'Hellow',
                                            url: 'tcode',
                                            flag: true,
                                            type: 'tcode',
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    };

    getFavList() {
      const fav = this.localStorageService.getFav();
      if (!fav || (fav.length === 0)) {
        // console.log('Get default');
        this.localStorageService.setFav(this.files.data);
        return this.files.data;
      } else {
        // console.log('Get from Local Storage');
        return fav;
      }
    }
}
