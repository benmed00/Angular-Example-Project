import { HelperService } from './helper.service';
import { Account } from './../app/entities';
import { Injectable } from '@angular/core';
import { USER_ITEM, TOKEN_ITEM } from '../app/config';



@Injectable()
export class StorageService {

  constructor(private helper:HelperService) { }

  getUser():Account{
    let storedVal = localStorage.getItem(USER_ITEM) ;
    if(storedVal == null || storedVal == undefined || storedVal == '')
      return null ;
    return JSON.parse(storedVal) ;
  }

  storeUser(account:Account):void{
    let user_string:string = JSON.stringify(account);
    localStorage.setItem(USER_ITEM, user_string) ;
  }

  getToken():string{
    return localStorage.getItem(TOKEN_ITEM) ;
  }

  storeToken(token:string):void{
    localStorage.setItem(TOKEN_ITEM,token);
  }

  resetStorage():void{
    localStorage.clear();
  }

}
