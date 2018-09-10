import { Shop, PaginationOptionsHolder } from './../../app/entities';
import { Component, OnInit, HostListener, Input, EventEmitter, Output } from '@angular/core';
import {PageEvent} from '@angular/material';

const RESPONSIVE_CARDS_RULES:Array<{min:number, max:number, cols:number}> = [
  {min: 800, max: 10000, cols:5 }, 
  {min: 700, max:799, cols: 4}, 
  {min: 500, max:699, cols: 3}, 
];


@Component({
  selector: 'shops-pagination',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css']
})
export class ShopsComponent implements OnInit {

  @Input()
  shops:Array<Shop>=[];

  cols:number;

  @Input()
  pagination:PaginationOptionsHolder;

  @Output()
  paged=new EventEmitter();

  
  constructor() {
    this.cols=this.getColsNumber();
  }

  ngOnInit() {
    
  }

  getColsNumber():number{
    let res = 0 ;
    RESPONSIVE_CARDS_RULES.forEach(elem => {
      if(this.isBorned(elem))
        res = elem.cols;
    }) ;
    return (res == 0) ? 2 : res;
  }

  isBorned(elem){
    return window.innerWidth > elem.min && window.innerWidth < elem.max ;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.cols = this.getColsNumber() ;
  }
  
  changedPage(event:PageEvent){
    console.log('changed page ', event) ;
    this.paged.next(event) ;
  }

}
