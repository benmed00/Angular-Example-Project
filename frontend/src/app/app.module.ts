

import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';

import { IconFilterPipe } from '../pipes/icon-filter.pipe';

import { RegisterComponent } from '../pages/register/register.component';
import { NearShopsComponent } from './../pages/near-shops/near-shops.component';
import { PreferedShopsPage } from '../pages/prefered-shops/prefered-shops.component';
import { LoginComponent } from '../pages/login/login.component';
import { ShopsPage } from './../pages/shops/shops.page';

import { TokenInterceptor } from './../services/jwt-interceptor';
import { AuthGuard } from '../services/auth-guard.service';
import { AuthenticationService } from '../services/authentication.service';
import { DataService } from '../services/data.service';
import { StorageService } from '../services/storage.service';
import { HelperService } from '../services/helper.service';

import { MyMatModule } from '../modules/my-mat.module';
import { RoutingModule } from '../modules/routing.module';

import { AppNavigationComponent } from '../components/app-navigation/app-navigation.component';
import { ShopCardComponent } from './../components/shop-card/shop-card.component';
import { ShopsComponent } from './../components/shops/shops.component';





@NgModule({
  declarations: [
    AppComponent,
    ShopsComponent,
    NearShopsComponent,
    ShopCardComponent,
    LoginComponent,
    AppNavigationComponent,
    RegisterComponent,
    ShopsPage,
    IconFilterPipe,
    PreferedShopsPage,
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    MyMatModule,
    RoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBksBGJokPw5K3yo8kqZ24F3L49OFCiIo4'
    })
  ],
  providers: [AuthGuard, AuthenticationService, DataService, StorageService, HelperService,
            {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {}
