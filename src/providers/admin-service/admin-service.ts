import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
// import { Woker } from '../../app/worker'
@Injectable()
export class AdminServiceProvider {
  // baseUrl: baseApiUrl;
  constructor(public http: HttpClient) {
    console.log('Hello Admin Provider');
  }

  AddWorker(WorkerName: string, age: number, address: string, phoneNumber: number) {
   var token=localStorage.getItem('userToken');
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + token})
    };
    // var data = "WorkerName=" + WorkerName + "&Age=" + age + "&Address=" + address +"&PhoneNumber=" + phoneNumber;
    var queryString= "api/SilverERPWorker?WorkerName=" + WorkerName +"&Age="+ age +"&Address="+ address +"&PhoneNumber="+phoneNumber;
    return this.http.post('http://localhost:50693/'+ queryString,httpOptions);
  }



}
