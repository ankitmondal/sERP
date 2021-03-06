import { workerModel } from './../../models/worker.model';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { config  } from '../service-config/service-config';
import { itemModel  } from '../../models/item.model';
import { clientModel  } from '../../models/client.model';

@Injectable()
export class AdminServiceProvider {
  apiUrl: string;
  token:string = localStorage.getItem('userToken');
 
  header:Headers = new Headers({'Content-Type': 'application/json',
                                'Authorization':'Bearer ' + this.token  });
        
  nullObject :object = {};

  constructor(public http: Http) {
    console.log('Hello Admin Provider');
    this.apiUrl = config.url;
  } 

  AddWorker(WorkerName: string, age: number, address: string, phoneNumber: string) {
    var queryString = "api/Worker/AddWorker?WorkerName=" 
                      + WorkerName + "&Age=" + age + "&Address=" 
                      + address + "&PhoneNumber=" + phoneNumber;
    
    return this.http.post(this.apiUrl + queryString , this.nullObject , { headers : this.header });
  }  

  UpdateWorker(kId: number, worker: workerModel) {
    var queryString = "api/Worker/UpdateWorker?id="+kId;
    console.log(worker);
     let headers:Headers = new Headers ();
     headers.append('Content-Type', 'application/json');
     headers.append('Authorization', 'Bearer ' + this.token );

    return this.http.post(this.apiUrl + queryString, worker, { headers : headers});
  }

  DeleteWorker(kId: number) {
    var queryString = "api/Worker/DeleteWorker?id="+kId;
    return this.http.post(this.apiUrl + queryString,this.nullObject , { headers : this.header });
  }

  AddItem(item: itemModel) {
    var queryString = "api/Item/AddItem";
    return this.http.post(this.apiUrl + queryString , item, { headers : this.header });
  }

  UpdateItem(itemID: number,item: itemModel) {
    var queryString = "api/Item/UpdateItem?id="+itemID;
    let options = {
        headers: this.header     
    };        
    return this.http.post(this.apiUrl + queryString, item, options);
  }

  DeleteItem(itemID: number) {
    var queryString = "api/Item/DeleteItem?id="+itemID;
    let options = {
        headers: this.header    
    };        
    return this.http.post(this.apiUrl + queryString, this.nullObject , options);
  }


  AddClient(client: clientModel) {
    var queryString = "api/Client/AddClient";
    
    let options = {
        headers: this.header
    };        
    return this.http.post(this.apiUrl + queryString , client, options);
  }

  UpdateClient(clientID: number,client: clientModel) {
    var queryString = "api/Client/UpdateClient?id="+clientID;
    let options = {
        headers: this.header     
    };        

    return this.http.post(this.apiUrl + queryString, client ,options);
  }

  DeleteClient(clientID: number) {
    var queryString = "api/Client/DeleteClient?id="+clientID;
    let options = {
        headers: this.header   
    };        
    return this.http.post(this.apiUrl + queryString, this.nullObject , options);
  }
}
