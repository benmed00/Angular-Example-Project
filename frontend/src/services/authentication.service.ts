import { Account,Credentials } from './../app/entities';
import { BASE_URL, LOGIN_PATH, REGISTER_PATH, CHECK_TOKEN_PATH, USER_DETAILS_PATH } from './../app/config';
import { Injectable, forwardRef, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import {Http, Headers,RequestOptions} from '@angular/http'


@Injectable()
export class AuthenticationService {

  constructor( @Inject(forwardRef(() => HttpClient)) private http: HttpClient ) { }

  login(credentials: Credentials): Observable<any> {
    return this.http.post(BASE_URL.concat(LOGIN_PATH), credentials,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }) ;
  }

  register(account:Account) :Observable<any>{
    return this.http.post(BASE_URL.concat(REGISTER_PATH), account ,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }) ;
  }

  checkToken():Observable<any>{ 
    return this.http.get<any>(BASE_URL.concat(CHECK_TOKEN_PATH)) ;
  }

  userDetails():Observable<Account>{
    return this.http.get<Account>(BASE_URL.concat(USER_DETAILS_PATH)) ;
  }

}