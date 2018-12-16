import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { config } from '../service-config/service-config'
import { workerorderModel } from './../../models/workerorder.model';
/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {
  _apiUrl: string;
  token:string = localStorage.getItem('userToken');
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
                               'Authorization':'Bearer ' + this.token  
                            })
  };

  constructor(public http: HttpClient) {
    console.log('Hello UserServiceProvider Provider');
    this._apiUrl = config.url;
  }
  //Get Worker by user id
  GetWorker() {
    return this.http.get( this._apiUrl + 'api/SilverERPWorker', this.httpOptions);
  }
  //Get Items by user id
  GetMyItems() {
    return this.http.get( this._apiUrl + 'api/SilverERPItem', this.httpOptions);
  }
  //Get Clients by user id
  GetMyClients() {
    return this.http.get( this._apiUrl + 'api/SilverERPClient', this.httpOptions);
  }

  AddWorkerOrder(wOrder: workerorderModel) {
    var token = localStorage.getItem('userToken');
    var routeString = "api/SilverERPOrder";
    const header = new HttpHeaders({'Authorization':'Bearer ' + token}); 
    let options = {
        headers: header
    };        
    return this.http.post(this._apiUrl + routeString , wOrder, options);
  }
}
