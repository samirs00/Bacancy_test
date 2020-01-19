import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service'
import { ApisService } from '../services/apis.service';
import { Router } from '@angular/router';
import { RouteList } from '../constants/route-list';
import { ApiList } from '../constants/api-list';

@Injectable({
  providedIn: 'root'
})
export class SigninGuard implements CanActivate {

  public routeList = RouteList;
  public apiList = ApiList;


  constructor(private authService: AuthService,
    private apisService: ApisService,
    private router: Router) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.authService.getUserToken() != null && this.authService.getUserToken() != undefined) {
      return true
    } else {
      this.authService.logoutUser();
      return false;
    }
  }

}
