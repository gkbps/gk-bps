import { AppConfig } from '../../app.config';
import { SecurityService } from '../../nga/services';

import { Injectable } from '@angular/core';
// import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { HttpClientService } from '../../nga/services/httpClient.service';

@Injectable()
export class GkClientService {

    prefix = '/gkclients/';

    constructor(
    //   private http: Http,
      private httpClientService: HttpClientService,
      private config: AppConfig,
      private securityService: SecurityService,
    ) { }

    findMasterListPagination(filter: string, sort: string, first: number, rows: number) {
        const pagination = {
            filter: filter,
            sort: sort,
            first: first,
            rows: rows
        };
        // console.log(pagination);

        const reqOptions = {
         params: pagination
        };

        return this.httpClientService.get(this.prefix + '/masterListPagination', reqOptions);
        //   .map(res => {
        //     // IMPORTANT: res is full data, only return body for processing
        //     console.log(res);
        //     return res.body;
        //   });

        // const reqOptions = this.securityService.jwt().merge({params: pagination});
        // console.log(reqOptions);

        // return this.http.get(
        //     this.config.apiUrl + this.prefix + '/masterListPagination',
        //     reqOptions,
        //   )
        // .map((response: Response) => response.json());
    }

    findById(_id: string) {
        return this.httpClientService.get(this.prefix + _id);
        // .map(res => {
        //     // IMPORTANT: res is full data, only return body for processing
        //     console.log(res);
        //     return res.body;
        //   });

        // return this.http.get(
        //     this.config.apiUrl + this.prefix + _id,
        //     this.securityService.jwt(),
        //   )
        // .map((response: Response) => response.json());
    }

    create(gkclient: any) {
        // IMPORTANT: return full data to include res.status for alert
        return this.httpClientService.post(this.prefix, gkclient);

        // return this.http.post(
        //     this.config.apiUrl + this.prefix,
        //     gkclient,
        //     this.securityService.jwt(),
        //   );
    }

    update(gkclient: any) {
        // IMPORTANT: return full data to include res.status for alert
        return this.httpClientService.put(this.prefix + gkclient._id, gkclient);

        // return this.http.put(
        //     this.config.apiUrl + this.prefix + gkclient._id,
        //     gkclient,
        //     this.securityService.jwt(),
        //   );
    }

    disable(_id: string) {
        return this.httpClientService.patch(this.prefix + 'disable/' + _id, {});
        // return this.http.patch(
        //     this.config.apiUrl + this.prefix + 'disable/' + _id,
        //     {},
        //     this.securityService.jwt(),
        //   );
    }

    enable(_id: string) {
        return this.httpClientService.patch(this.prefix + 'enable/' + _id, {});
        // return this.http.patch(
        //     this.config.apiUrl + this.prefix + 'enable/' + _id,
        //     {},
        //     this.securityService.jwt(),
        //   );
    }

    mark(_id: string) {
        return this.httpClientService.patch(this.prefix + 'mark/' + _id, {});
        // return this.http.patch(
        //     this.config.apiUrl + this.prefix + 'mark/' + _id,
        //     {},
        //     this.securityService.jwt(),
        //   );
    }

    unmark(_id: string) {
        return this.httpClientService.patch(this.prefix + 'unmark/' + _id, {});
        // return this.http.patch(
        //     this.config.apiUrl + this.prefix + 'unmark/' + _id,
        //     {},
        //     this.securityService.jwt(),
        //   );
    }

    delete(_id: string) {
        return this.httpClientService.delete(this.prefix + _id);
        // return this.http.delete(
        //     this.config.apiUrl + this.prefix + _id,
        //     this.securityService.jwt(),
        //   );
    }

}
