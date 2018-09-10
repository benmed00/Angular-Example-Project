import { NearLocationParamsHolder, LocationHolder, Coords } from './../app/entities';
import { BASE_URL, SHOPS_PATH, LIKE_SHOP_PATH, UNLIKE_SHOP_PATH, PREF_SHOP_PATH } from './../app/config';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class DataService {

  constructor(private http:HttpClient) { }

  getShops(page:number=0, size:number=5):Observable<any>{
    return this.http.get(BASE_URL.concat(SHOPS_PATH),{
      params: new HttpParams().set('page', page.toString()).set('size', size.toString())
    });
  }

  getNearShops( position:Coords, distance:number, page:number=0, size:number=5 ):Observable<any>{
    let body = new NearLocationParamsHolder(
      new LocationHolder("Point", [position.lng,position.lat]),
      distance
    ) ;
    return this.http.post(BASE_URL.concat(SHOPS_PATH),body,{
      params: new HttpParams().set('page', page.toString()).set('size', size.toString()),
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  likeShop(id:string):Observable<any>{
    return this.http.get(BASE_URL.concat(LIKE_SHOP_PATH).concat(id)) ;
  }

  unLikeShop(id:string):Observable<any>{
    return this.http.get(BASE_URL.concat(UNLIKE_SHOP_PATH).concat(id)) ;
  }

  preferedShops(){
    return this.http.get(BASE_URL.concat(PREF_SHOP_PATH))
  }


}
