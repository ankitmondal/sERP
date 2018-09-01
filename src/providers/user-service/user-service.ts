import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello UserServiceProvider Provider');
  }

  //Get Worker by user id
  GetWorker() {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    };

    //var data = "WorkerName=" + WorkerName + "&password=" + credentials.password + "&grant_type=password";
    //var data = 
    return this.http.get('http://localhost:50693/api/SilverERPWorker',httpOptions);
  }
//Get Items by user id
  GetMyItems() {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    };
    //var data = "WorkerName=" + WorkerName + "&password=" + credentials.password + "&grant_type=password";
    //var data = 
    return this.http.get('http://localhost:50693/api/SilverERPItem',httpOptions);
  }
//Get Clients by user id
  GetMyClients() {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    };
    //var data = "WorkerName=" + WorkerName + "&password=" + credentials.password + "&grant_type=password";
    //var data = 
    return this.http.get('http://localhost:50693/api/SilverERPClient',httpOptions);
  }
}
