import { ShopsPage } from './../pages/shops/shops.page';
import { TokenInterceptor } from './../services/jwt-interceptor';
import { MyMatModule } from '../modules/my-mat.module';
import { RoutingModule } from '../modules/routing.module';
import { ShopCardComponent } from './../components/shop-card/shop-card.component';
import { NearShopsComponent } from './../pages/near-shops/near-shops.component';
import { ShopsComponent } from './../components/shops/shops.component';
import { LoginComponent } from '../pages/login/login.component'
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppNavigationComponent } from '../components/app-navigation/app-navigation.component';
import { ReactiveFormsModule } from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { RegisterComponent } from '../pages/register/register.component';
import { AuthGuard } from '../services/auth-guard.service';
import { AuthenticationService } from '../services/authentication.service';
import { DataService } from '../services/data.service';
import { HttpClientModule } from '@angular/common/http';
import {HttpModule} from '@angular/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {StorageService} from '../services/storage.service';
import { IconFilterPipe } from '../pipes/icon-filter.pipe' ;
import { HelperService } from '../services/helper.service';
import { AgmCoreModule } from '@agm/core';
import { PreferedShopsPage } from '../pages/prefered-shops/prefered-shops.component';


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
  providers: [AuthGuard, AuthenticationService, DataService,StorageService,HelperService,
            {provide: HTTP_INTERCEPTORS,useClass:TokenInterceptor,multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {}