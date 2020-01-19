import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationComponent } from './components/authentication/authentication.component';
import { SigninComponent } from './components/authentication/signin/signin.component';
import { SignupComponent } from './components/authentication/signup/signup.component';

import { SigninGuard } from './guards/signin.guard';
import { HomeComponent } from './components/home/home.component';

import { RouteList } from './constants/route-list'

const routeList = RouteList;

const routes: Routes = [
  {
    path: '',
    component: AuthenticationComponent,
    children: [
      {
        path: '',
        redirectTo: routeList.signin.name,
        pathMatch: 'full'
      },
      {
        path: routeList.signin.name,
        component: SigninComponent
      },
      {
        path: routeList.signup.name,
        component: SignupComponent
      }
    ]
  },
  {
    path:'home',
    canActivate: [SigninGuard],
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
