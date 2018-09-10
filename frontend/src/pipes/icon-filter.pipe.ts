import { HelperService } from './../services/helper.service';
import { StorageService } from './../services/storage.service';
import { Account } from './../app/entities';
import { Pipe, PipeTransform, OnInit } from '@angular/core';

@Pipe({
  name: 'iconFilter'
})
export class IconFilterPipe implements PipeTransform {
  user: Account;

  constructor(private storage: StorageService) {
    // will load user from localstorage each time filter is called
    this.user = this.storage.getUser();
  }

  transform(value: any): any {
    console.log('this is the id of current', value);
    if (this.isLiked(value)) {
      return 'like';
    } else {
      return 'dislike';
    }
  }

  isLiked(id: string): boolean {
    const res = this.user.likedShops.find(e => e === id);
    return res != null;
  }
}
