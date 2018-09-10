import { AuthenticationService } from './../../services/authentication.service';
import { HelperService } from './../../services/helper.service';
import { DataService } from './../../services/data.service';
import { StorageService } from './../../services/storage.service';
import { Shop, Account } from './../../app/entities';
import { Component, OnInit, Input } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'shop-card',
  templateUrl: './shop-card.component.html',
  styleUrls: ['./shop-card.component.css']
})
export class ShopCardComponent {

  @Input()
  shop:Shop; 

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private storage:StorageService, 
            private dataService:DataService, private helper:HelperService, private snackBar: MatSnackBar) {
    iconRegistry.addSvgIcon("like",sanitizer.bypassSecurityTrustResourceUrl("assets/imgs/icons/like.svg"));
    iconRegistry.addSvgIcon("dislike",sanitizer.bypassSecurityTrustResourceUrl("assets/imgs/icons/dislike.svg"));
   }

  toggleLike(id:string){
    console.log('clicked');
    if(this.isLiked(id)){
      console.log('we should unlike !') ;
      this.dataService.unLikeShop(id)
        .subscribe(this.toggleLikeSuccess.bind(this), 
                  this.toggleLikeError.bind(this)) ;      
    }
    else{
      console.log('we should like !') ;
      this.dataService.likeShop(id)
        .subscribe(this.toggleLikeSuccess.bind(this), 
        this.toggleLikeError.bind(this)) ;
    }
  }

  toggleLikeSuccess(res){
    console.log('like toggke with success', res) ;
    this.updateStorage(res);
    this.helper.likeToggle.next() ;
    this.snackBar.open('thanks <3','', {
      duration: 1200
    });
  }

  toggleLikeError(err){
    console.log('like toggke with error', err) ;
  }

  isLiked(id:string):boolean{
    let user = this.storage.getUser();
    let res = user.likedShops.find(e => e == id);
    return res != null ;
  }

  updateStorage(likedItems){
    let currentUser:Account= this.storage.getUser() ;
    currentUser.likedShops = likedItems ;
    this.storage.storeUser(currentUser) ;
  }

}
