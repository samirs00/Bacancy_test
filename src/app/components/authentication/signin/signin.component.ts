import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RouteList } from '../../../constants/route-list';
import { ApiList } from '../../../constants/api-list';

import { ApisService } from '../../../services/apis.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  public apiList = ApiList;
  public routeList = RouteList;
  loginForm: FormGroup;
  isSubmitted = false;
  constructor(
    private apisService: ApisService,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  login() {
    // console.log(this.loginForm.value);
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    
    // valid email and password
    // {
    //   "email": "eve.holt@reqres.in",
    //     "password": "cityslicka"
    // }
    let userDetails = {
      "email": this.loginForm.value.email,
      "password": this.loginForm.value.password
    }
    this.signInApi(userDetails)
      .then(res => {
        this.authService.setUserToken(res['token']);
        this.router.navigate([this.routeList.home.path]);
      })
      .catch(err => [
        console.log(err)
      ])
  }
  get formControls() { return this.loginForm.controls; }
  signUp() {
    this.router.navigate([this.routeList.signup.path])
  }

  signIn() {
    // console.log("SignIn info :", this.loginCredentials);
    let userDetails = {
      // "email": this.loginCredentials.email.toLowerCase(),
      // "password": this.loginCredentials.password,
      // 'platform': this.loginPlatform.convee
    }
    this.signInApi(userDetails)
      .then(res => {
        this.authService.setUserToken(res['token']);
        this.router.navigate([this.routeList.home.path]);
      })
      .catch(err => [
        console.log(err)
      ])
  }

  signInApi(userDetails) {
    return new Promise((resolve, reject) => {
      this.apisService.postApiCallWithObservableHandler(
        this.apiList.signIn,
        userDetails,
        null,
        (res) => {
          if (res) {
            resolve(res);
          } else {
            reject(res);
          }
        });
    });
  }
}
