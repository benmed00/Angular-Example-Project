import { UNLOGED_PATH, LOGED_PATH } from './../../app/config';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './app-navigation.component.html',
  styleUrls: ['./app-navigation.component.css']
})
export class AppNavigationComponent {
  
  isLoggedIn:boolean = false ; 

  constructor(private router:Router) { 
    console.log('from navigation : ', router.parseUrl(router.url))
    router.events.subscribe(evt => {
      if(evt instanceof NavigationEnd)
        this.checkEvent(evt);
    })
  }

  checkEvent(evt:NavigationEnd){
    let path:string = evt.url ;
    this.isLoggedIn = LOGED_PATH.find(e => e == path) != null ;
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']) ;
  }

}
