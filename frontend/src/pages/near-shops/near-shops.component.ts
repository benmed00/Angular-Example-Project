import { DEFAULT_PAGINATION_OPTIONS } from './../../app/config';
import { PageEvent, MatSliderChange } from '@angular/material';
import { Shop, Coords, PaginationOptionsHolder } from './../../app/entities';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { HelperService } from '../../services/helper.service';
import { Router } from '@angular/router';
import {AgmMap} from '@agm/core' ;

@Component({
  selector: 'app-near-shops',
  templateUrl: './near-shops.component.html',
  styleUrls: ['./near-shops.component.css']
})
export class NearShopsComponent implements OnInit {

  position:Coords = null;

  shopsPage:Array<Shop>=[];

  distance:number = 1 ;

  paginationOpts: PaginationOptionsHolder ; 
 
  constructor(private dataService: DataService, private helper:HelperService, private router: Router) { }

  ngOnInit() {
    this.helper.likeToggle.subscribe(() => {
      console.log('try to reload pages ....');
      this.loadPage(this.paginationOpts.pageIndex, this.paginationOpts.pageSize);
    });    

    navigator.geolocation.getCurrentPosition((position)=>{
      this.position = new Coords(position.coords.longitude, position.coords.latitude) 
      this.loadPage();
    }, err=> {
      console.log('Cannot get the position', err) ;
      this.position = new Coords(34.0091955, -6.8444438) ;    
    }) ;
  }

  loadPage(page:number=0, size:number=5){
    this.dataService.getNearShops(this.position, this.distance, page,size)
      .subscribe(this.fetchShops.bind(this), 
                this.handleError.bind(this));
  }

  pageChanged(page:PageEvent){
    console.log('page changed', page);
    this.loadPage(page.pageIndex, page.pageSize) ;
  }

  fetchShops(res:any){
    console.log('finally get data', res);
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

  changeDistance(event:MatSliderChange){
    console.log('change distance', event);
    this.distance = event.value ;
    this.loadPage();
  }

}

