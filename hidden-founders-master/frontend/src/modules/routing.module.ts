import { ShopsPage } from './../pages/shops/shops.page';
import { RegisterComponent } from '../pages/register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
import { NearShopsComponent } from '../pages/near-shops/near-shops.component';
import { AuthGuard } from '../services/auth-guard.service';
import { PreferedShopsPage } from '../pages/prefered-shops/prefered-shops.component';

const routes:Routes =[
  { path: 'login',component: LoginComponent },
  { path: 'register',component: RegisterComponent },
  { path: 'shops',component: ShopsPage,/* canActivate: [AuthGuard] */ },
  { path: 'nearby',component: NearShopsComponent,/* canActivate: [AuthGuard] */ },
  { path: 'prefered',component: PreferedShopsPage,/* canActivate: [AuthGuard] */ },
  { path: '', redirectTo: '/shops', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
