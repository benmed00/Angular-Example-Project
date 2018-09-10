import { StorageService } from './storage.service';
import { BASE_URL, UNLOGED_PATH } from './../app/config';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private storage: StorageService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isExcepted(request)) {
                                  return next.handle(request);
                                }
    const token = this.storage.getToken();
    if (token != null && token !=   undefined) {
      const authreq = request.clone({headers: request.headers.set('Authorization', token)})
      return next.handle(authreq);
    }
    return next.handle(request);
  }

  isExcepted(request: HttpRequest<any>): boolean {
    let url = request.url;
    if(!url.match(BASE_URL)) {
      return true;
                             }
    return UNLOGED_PATH.find(e => url.match(e) != null ) != null;
  }
}
