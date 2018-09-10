import { Account } from './../app/entities';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class HelperService {
  constructor() { }
  public likeToggle:Subject<Account>= new Subject();
}
