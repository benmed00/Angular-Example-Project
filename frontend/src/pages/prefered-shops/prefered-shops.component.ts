import { Router } from '@angular/router';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Shop } from '../../app/entities';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-prefered-shops',
  templateUrl: './prefered-shops.component.html',
  styleUrls: ['./prefered-shops.component.css']
})
export class PreferedShopsPage implements OnInit {

  shops:Array<Shop>;

  pagination = null ;

  constructor(private dataService:DataService, private helper:HelperService, private router: Router) { }

  ngOnInit() {
    this.loadData() ;
    this.helper.likeToggle.subscribe(() => this.loadData() ) ;
  }

  loadData(){
    this.dataService.preferedShops()
      .subscribe((res:any)=> this.shops = res, this.handleError.bind(this)) ;
  }


  handleError(error){
    console.log('error getting the data', error) ;
    if(error.status == 401)
      this.router.navigate(['/login']) ;
  }
}
