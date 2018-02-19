import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpClientService } from '../../nga/services/';
import { Todo } from './todos.models';

@Injectable()
export class TodosServices {

  suffixUrl = '/todos/';

  constructor(
    private httpClientService: HttpClientService,
  ) {
  }

  getTodos() {
    const todos = [
      {
        _id: 1,
        title: 'Learn ngrx/store',
        completed: false
      },
      {
        _id: 2,
        title: 'Learn Angular',
        completed: false
      },
    ];

    return Observable.of(todos);

    // return Observable.timer(3000).mapTo(todos);

  }

}
