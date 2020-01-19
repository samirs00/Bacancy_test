import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RouteList } from '../../../constants/route-list';
import { ApiList } from '../../../constants/api-list';
// import { User } from '../../../interfaces/user';


import { ApisService } from '../../../services/apis.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public apiList = ApiList;
  public routeList = RouteList;
  registerForm: FormGroup;
  isSubmitted = false;
  constructor(
    private apisService: ApisService,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      // profilePicture: ['', Validators.required],
    });
  }
  signIn() {
    this.router.navigate([this.routeList.signin.path])
  }
  register(){
    this.isSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    let userDetails = {
      firstName: this.registerForm.value.firstName,
      lastName:this.registerForm.value.lastName,
      middleName:this.registerForm.value.middleName,
      mobile: this.registerForm.value.mobile,
      email: this.registerForm.value.email,
      address: this.registerForm.value.address,
      dateOfBirth: this.registerForm.value.dateOfBirth
    }
    this.signUpApi(userDetails)
      .then(res => {
        console.log("successfull register user")
        // this.authService.setUserToken(res['token']);
        // this.router.navigate([this.routeList.home.path]);
      })
      .catch(err => [
        console.log(err)
      ])
  }
  get formControls() { return this.registerForm.controls; }


  signUpApi(userDetails) {
    return new Promise((resolve, reject) => {
      this.apisService.postApiCallWithObservableHandler(
        this.apiList.signUp,
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
