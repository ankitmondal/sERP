import { workerModel } from './../../models/worker.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import { config  } from '../service-config/service-config';
import { itemModel  } from '../../models/item.model';
import { clientModel  } from '../../models/client.model';
@Injectable()
export class AdminServiceProvider {
  _apiUrl: string;

  constructor(public http: HttpClient) {
    console.log('Hello Admin Provider');
    this._apiUrl = config.url;
  } 

  AddWorker(WorkerName: string, age: number, address: string, phoneNumber: string) {
    var token = localStorage.getItem('userToken');
    var queryString = "api/SilverERPWorker?WorkerName=" + WorkerName + "&Age=" + age + "&Address=" + address + "&PhoneNumber=" + phoneNumber;
    const header = new HttpHeaders({'Authorization':'Bearer ' + token}); 
    let options = {
        headers: header
    };        
    return this.http.post(this._apiUrl + queryString , "" , options);
  }  

  UpdateWorker(kId: number,worker: workerModel) {
    var token = localStorage.getItem('userToken');
    var queryString = "api/SilverERPWorker?id="+kId;
    console.log(queryString);
    const header = new HttpHeaders({'Authorization':'Bearer ' + token}); 
    let options = {
        headers: header ,        
    };        
    return this.http.put(this._apiUrl + queryString,worker,options);
  }

  DeleteWorker(kId: number) {
    var token = localStorage.getItem('userToken');
    var queryString = "api/SilverERPWorker?id="+kId;
    console.log(queryString);
    const header = new HttpHeaders({'Authorization':'Bearer ' + token}); 
    let options = {
        headers: header ,          
    };        
    return this.http.delete(this._apiUrl + queryString,options);
  }

  AddItem(item: itemModel) {
    var token = localStorage.getItem('userToken');
    var queryString = "api/SilverERPItem";
    const header = new HttpHeaders({'Authorization':'Bearer ' + token}); 
    let options = {
        headers: header
    };        
    return this.http.post(this._apiUrl + queryString , item, options);
  }

  UpdateItem(itemID: number,item: itemModel) {
    var token = localStorage.getItem('userToken');
    var queryString = "api/SilverERPItem?id="+itemID;
    console.log(queryString);
    const header = new HttpHeaders({'Authorization':'Bearer ' + token}); 
    let options = {
        headers: header ,
        //params:{id : itemID}     
    };        
    return this.http.put(this._apiUrl + queryString,item,options);
  }

  DeleteItem(itemID: number) {
    var token = localStorage.getItem('userToken');
    var queryString = "api/SilverERPItem?id="+itemID;
    console.log(queryString);
    const header = new HttpHeaders({'Authorization':'Bearer ' + token}); 
    let options = {
        headers: header ,
        //params:{id : itemID}     
    };        
    return this.http.delete(this._apiUrl + queryString,options);
  }


  AddClient(client: clientModel) {
    var token = localStorage.getItem('userToken');
    var queryString = "api/SilverERPClient";
    const header = new HttpHeaders({'Authorization':'Bearer ' + token}); 
    let options = {
        headers: header
    };        
    return this.http.post(this._apiUrl + queryString , client, options);
  }

  UpdateClient(clientID: number,client: clientModel) {
    var token = localStorage.getItem('userToken');
    var queryString = "api/SilverERPClient?id="+clientID;
    console.log(queryString);
    const header = new HttpHeaders({'Authorization':'Bearer ' + token}); 
    let options = {
        headers: header ,
        //params:{id : itemID}     
    };        
    return this.http.put(this._apiUrl + queryString,client,options);
  }

  DeleteClient(clientID: number) {
    var token = localStorage.getItem('userToken');
    var queryString = "api/SilverERPClient?id="+clientID;
    console.log(queryString);
    const header = new HttpHeaders({'Authorization':'Bearer ' + token}); 
    let options = {
        headers: header ,
        //params:{id : itemID}     
    };        
    return this.http.delete(this._apiUrl + queryString,options);
  }

  
}
