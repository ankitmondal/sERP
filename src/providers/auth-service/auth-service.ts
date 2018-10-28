import { HttpClient, HttpHeaders,HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
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
    credentials.email="testing@test.com";
    credentials.password="Abcd*1234";

    var data = "username=" + credentials.email + "&password=" + credentials.password + "&grant_type=password";
    // const httpOptions = {
    //   headers: new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' })
    // };
    const header: HttpHeaders = new HttpHeaders();
    header.append('Content-Type', 'application/x-www-urlencoded');
    header.append('No-Auth', 'True');
    const httpOptions = {
      headers: header
    };
    return this.http.post('http://localhost:50693/Token', data, httpOptions);
  }


 public getUserInfo() : User {
    return this.currentUser;
  }
 
  public logout() {
    localStorage.removeItem('userToken');
    // this.router.navigate(['/login']);
  }
}
