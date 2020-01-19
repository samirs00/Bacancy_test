import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})
export class ApisService {

  baseUrl: any = "https://reqres.in/";
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }




  getApiCallWithObservableHandler(api: any, cb) {
    this.getApiCallWithObservable(api).subscribe(res => {
      let resp = this.responseHandler(res);
      cb(resp);
    }, err => {
      console.log("error in  getApiCallWithObservableHandler:", err);
      this.errorHandler(err['error']);
      cb(null);
    });
  }

  getApiCallWithObservable(api): Observable<any> {
    let headers = new HttpHeaders();

    // set http request headers if avaiable
    if (api['contentType'] == "application/json") {
      headers = headers.set('Content-Type', api['contentType'])
    }

    // add authorization token in request headers
    if (api['authorization']) {
      if (!this.authService.getUserToken()) {
        // return of({ status: 404, message: "Session expire, login again" });
        return of({ status: { code: 404, message: "Session expire, login again" }, result: { message: "Session expire, login again" } });

      }
      headers = headers.append('authorization', this.authService.getUserToken());
    }

    return this.http.get(this.baseUrl + api['name'] + api['parameter'], { headers: headers })
  }

  postApiCallWithObservableHandler(api: any, data: any, headers: any, cb, errorNotification?: boolean) {
    this.postApiCallWithObservable(api, data, headers).subscribe(res => {
      let resp = this.responseHandler(res);
      cb(resp);
    }, err => {
      if (errorNotification != undefined) {
        this.errorHandler(err['error'], errorNotification);
      } else {
        this.errorHandler(err['error']);
      }

      cb(null);
    });
  }

  postApiCallWithObservable(api, data, headersArray): Observable<any> {
    let headers = new HttpHeaders();

    // set http request headers if avaiable
    if (api['contentType'] == "application/json") {
      headers = headers.set('Content-Type', api['contentType']);
    }
    if (headersArray) {
      for (let header of headersArray) {
        headers = headers.append(header['key'], header['value']);
      }
    }

    // add authorization token in request headers
    if (api['authorization']) {
      if (!this.authService.getUserToken()) {
        // return of({ status: 404, message: "Session expire, login again" });
        return of({ status: { code: 404, message: "Session expire, login again" }, result: { message: "Session expire, login again" } });

      }
      headers = headers.append('Authorization', this.authService.getUserToken());
    }
    return this.http.post(this.baseUrl + api['name'], data, { headers: headers })
  }

  responseHandler(res, notification?: boolean) {
    if (res) {
      return res
    } else {
      return null
    }
    // switch (res['status'].code) {
    //   case 200:
    //     return res['result']

    //   case 201:
    //     return res['result']

    //   case 203:
    //     return null

    //   case 204:
    //     return null

    //   case 400:
    //     return null

    //   case 403:
    //     return null

    //   case 401:
    //     return null

    //   case 404:
    //     return null

    //   case 408:
    //     return null

    //   case 409:
    //     return null

    //   case 500:
    //     return null

    //   case 503:
    //     return null

    //   case 801:
    //     return null

    //   default:
    //     return null

    // }
  }

  errorHandler(error, notification?: boolean) {
    console.log("errorHandler error :", error)
    if (!navigator.onLine) {
      console.log("Please check your internet connection");
    } else if (notification == undefined) {
      console.log(error.result.message || error);
    }
    return error;
  }
}
