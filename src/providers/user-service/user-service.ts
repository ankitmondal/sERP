import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { config } from '../service-config/service-config'
import { orderModel } from './../../models/order.model';
// import { HttpClient} from '@angular/common/http';

import 'rxjs/add/operator/map';
// import { catchError, map } from 'rxjs/operators';
import { TransModel } from '../../models/trans.model';

@Injectable()
export class UserServiceProvider {
  apiUrl: string;
  token:string = localStorage.getItem('userToken');
  httpOptions  = {
    headers: new Headers({ 'Content-Type': 'application/json',
                           'Authorization':'Bearer ' + this.token  
                         })
  };
  nullObject :object = {};

  constructor(public http: Http) {
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

  GetClientBalanceSheet() {
    return this.http.get( this.apiUrl + 'api/Order/GetClientBalanceSheet', this.httpOptions)
    .map( (res: any) => {
      return res.json()
    });
  }

  GetWorkerBalanceSheet() {
    return this.http.get( this.apiUrl + 'api/Order/GetWorkerBalanceSheet', this.httpOptions)
    .map( (res: any) => {
      return res.json()
    });
  }

  AddOrder(wOrder: orderModel) {
    var routeString = "api/Order/AddOrder";
    return this.http.post(this.apiUrl + routeString , wOrder, this.httpOptions);
  }
  
  DeleteOrder(orderID:number){
    var routeString = "api/Order/DeleteOrder?orderID=" + orderID;
    return this.http.post(this.apiUrl + routeString , this.nullObject , this.httpOptions)
    .map( (res: any) => {
      return res.json()
    });
  }

  GetClientTransaction(ClientID:number){
    var routeString = "api/Report/GetClientTransactions?ClientID=" + ClientID;
    return this.http.get(this.apiUrl + routeString , this.httpOptions)
    .map( (res: any) => {
      return res.json()
    });
  }

  GetWorkerTransaction(WorkerID:number){
    var routeString = "api/Report/GetWorkerTransactions?WorkerID=" + WorkerID;
    return this.http.get(this.apiUrl + routeString , this.httpOptions)
    .map( (res: any) => {
      return res.json()
    });
  }

  CreateTransaction(trans:TransModel){
    var routeString = "api/Report/CreateTransactions" ;
    return this.http.post(this.apiUrl + routeString , trans, this.httpOptions);
  }
  
  DeleteTransaction(orderID:number, IsCarryForward:boolean){
    var routeString = "api/Order/DeleteTrans?orderID=" + orderID +"&isCarryForward=" + IsCarryForward;
    return this.http.post(this.apiUrl + routeString , this.nullObject, this.httpOptions);
  }

 }
