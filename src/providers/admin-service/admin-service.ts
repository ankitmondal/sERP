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

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded'})
    };

    //var data = "WorkerName=" + WorkerName + "&password=" + credentials.password + "&grant_type=password";
    return this.http.post('http://localhost:50693/api/SilverERPWorker?WorkerName="Ankit"',httpOptions);
  }


}
