import { AuthenticationService } from './authentication.service';
import { NgClass } from "@angular/common/src/directives/ng_class";


import { Injectable, forwardRef, Inject } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthGuard implements CanActivate {

  isLoggedIn:boolean = false ;

  constructor(@Inject(forwardRef(() => Router)) private router: Router, private authService:AuthenticationService) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    //throw new Error("Method not implemented.");
    if(localStorage.getItem('token')){
        return this.authService.checkToken();
    }
    else return this.unAuthorized(null);
  }


  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ) {    
  //   if(localStorage.getItem('token')){
  //      return this.authService.checkToken().subscribe( 
  //        this.authorized.bind(this),
  //       this.unAuthorized.bind(this));
  //   }
  //   else return this.unAuthorized(null);
  // }
  
  authorized(res){
    console.log('success', res) ;
    return true ;
  }


  unAuthorized(err){
    console.log('error', err) ;
    this.router.navigate(['/login']) ;
    return false ;
  }



}




