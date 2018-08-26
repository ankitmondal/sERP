import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
/*
/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export class User {
  name: string;
  email: string;
 
  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

@Injectable()
export class AuthServiceProvider {
  currentUser: User;
  rootUrl: 'http://localhost:50693/';

  constructor(public http: HttpClient) {
    console.log('Hello AuthServiceProvider Provider');
  }

  public login(credentials) {
    credentials.email="ankitmondalece@gmail.com";
    credentials.password="Abcdef#2";
    
    var data = "username=" + credentials.email + "&password=" + credentials.password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
    return this.http.post('http://localhost:50693/token', data, { headers: reqHeader });

    // if (credentials.email === null || credentials.password === null) {
    //   return Observable.throw("Please insert credentials");
    // } else {
    //   return Observable.create(observer => {
    //     // At this point make a request to your backend to make a real check!
    //     //let access = (credentials.password === "pass" && credentials.email === "email");
    //     this.currentUser = new User('Ankit', 'ankitmondalece@gmail.com');
        
    //     credentials.email="ankitmondalece@gmail.com";
    //     credentials.password="Abcdef#2";

    //     var data = "username=" + credentials.email + "&password=" + credentials.password + "&grant_type=password";
    //     // var data = "username=" + userName + "&password=" + password + "&grant_type=password";
    //     var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
    //     return this.http.post(this.rootUrl + '/token', data, { headers: reqHeader });

    //     // var data = "username=" + credentials.email + "&password=" + credentials.password + "&grant_type=password";
    //     // var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
    //     //  this.http.post('http://localhost:50693/token', data, { headers: reqHeader })
    //     //  .map((result: Response) => result.json)
    //     //  .subscribe(result => {
    //     //    console.log("token");
    //     //   console.log(result);
    //     // }, error => {
    //     //   console.log(error);// Error getting the data
    //     // });
      
    //     //  observer.next(false);
    //     //  observer.complete();
    //   });
    // }
  }


 public getUserInfo() : User {
    return this.currentUser;
  }
 
  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}
