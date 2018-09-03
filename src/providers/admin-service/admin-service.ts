import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { config  } from '../service-config/service-config'
@Injectable()
export class AdminServiceProvider {
  _apiUrl: string;

  constructor(public http: HttpClient) {
    console.log('Hello Admin Provider');
    this._apiUrl = config.url;
    console.log(this._apiUrl);
  }

  AddWorker(WorkerName: string, age: number, address: string, phoneNumber: number) {
    var token = localStorage.getItem('userToken');
    const header: HttpHeaders = new HttpHeaders();
    const tokenData='Bearer ' + token;
    header.set('Authorization', tokenData);
    const httpOptions = {
      headers: header
    };
    console.log(tokenData);
    var queryString = "AddWorker?WorkerName=" + WorkerName + "&Age=" + age + "&Address=" + address + "&PhoneNumber=" + phoneNumber;
    return this.http.post(this._apiUrl + queryString,"", httpOptions);
  }
}
