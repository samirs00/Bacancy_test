import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;
  constructor(
    private router: Router,
  ) { }


  setUserToken(token) {
    localStorage.setItem('aToken', token);
  }
  getUserToken() {
    // console.log("getUserToken :", localStorage.getItem('aToken'));
    return localStorage.getItem('aToken');
  }
  setUserDate(data) {
    this.userData = data
  }
  getUserDate() {
    return this.userData
  }
  logoutUser() {
    this.clearCookies();
    window.localStorage.clear();
    window.sessionStorage.clear();
    this.router.navigateByUrl('/');
  }
  clearCookies() {
    window.document.cookie.split(";").forEach(function (c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
  }
}