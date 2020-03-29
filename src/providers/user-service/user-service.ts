import { Http, Headers , BaseRequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { config } from '../service-config/service-config'
import { orderModel } from './../../models/order.model';
import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';

import 'rxjs/add/operator/map';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class UserServiceProvider {
  apiUrl: string;
  token:string = localStorage.getItem('userToken');
  httpOptions  = {
    headers: new Headers({ 'Content-Type': 'application/json',
                           'Authorization':'Bearer ' + this.token  
                         })
  };

  constructor(public http: Http, public httpClinet : HttpClient) {
    console.log('Hello UserServiceProvider Provider');
    this.apiUrl = config.url;
  }
  //Get Worker by user id
  GetWorker() {
    return this.http.get( this.apiUrl + 'api/Worker/GetWorker', this.httpOptions)
    .map( (res: any) => {
      return res.json()
    });
  }
  //Get Items by user id
  GetMyItems() {
    return this.http.get( this.apiUrl + 'api/Item/GetItem', this.httpOptions)
    .map( (res: any) => {
      return res.json()
    });;
  }
  //Get Clients by user id
  GetMyClients() {
    return this.http.get( this.apiUrl + 'api/Client/GetClient', this.httpOptions)
    .map( (res: any) => {
      return res.json()
    });
  }
  //Get Worker by user id
  GetOrderSummary() {
    return this.http.get( this.apiUrl + 'api/Order/OrderSummary', this.httpOptions)
    .map( (res: any) => {
      return res.json()
    });
  }

  GetWorkerOrderSummary() {
    return this.http.get( this.apiUrl + 'api/Order/GetWorkerOrderSummary', this.httpOptions)
    .map( (res: any) => {
      return res.json()
    });
  }

  GetClientOrderSummary() {
    return this.http.get( this.apiUrl + 'api/Order/GetClientOrderSummary', this.httpOptions)
    .map( (res: any) => {
      return res.json()
    });
  }

  AddOrder(wOrder: orderModel) {
    var routeString = "api/Order/AddOrder";
    return this.http.post(this.apiUrl + routeString , wOrder, this.httpOptions);
  }
}
