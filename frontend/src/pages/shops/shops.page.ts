import { Router } from '@angular/router';
import { HelperService } from './../../services/helper.service';
import { MOCKED_SHOPS, DEFAULT_PAGINATION_OPTIONS } from './../../app/config';
import { PageEvent } from '@angular/material';
import { Shop, PaginationOptionsHolder } from './../../app/entities';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.page.html',
  styleUrls: ['./shops.page.css']
})
export class ShopsPage implements OnInit {

  shopsPage:Array<Shop>=[];

  paginationOpts: PaginationOptionsHolder ; 

  constructor(private dataService:DataService, private helper:HelperService, private router: Router) { }

  ngOnInit() {
    this.helper.likeToggle.subscribe(() => {
      console.log('try to reload pages ....');
      this.loadPage(this.paginationOpts.pageIndex, this.paginationOpts.pageSize);
    });
    this.loadPage();
  }

  loadPage(page:number=0, size:number=5){
    this.dataService.getShops(page,size)
      .subscribe(this.fetchShops.bind(this), 
                this.handleError.bind(this));

    console.log('Connexion state', navigator.onLine);
  }

  pageChanged(page:PageEvent){
    console.log('page changed', page);
    this.dataService.getShops(page.pageIndex, page.pageSize)
      .subscribe(this.fetchShops.bind(this), 
      this.handleError.bind(this));
  }

  fetchShops(res:any){
    console.log('finally get data ', res);
    this.shopsPage = res.content ;
    this.paginationOpts= new PaginationOptionsHolder(
      res.number,
      res.totalElements, 
      res.size,
      DEFAULT_PAGINATION_OPTIONS.pageSizeOptions
    );
  }

  handleError(error){
    console.log('error getting the data', error) ;
    if(error.status == 401)
      this.router.navigate(['/login']) ;
  }

}
