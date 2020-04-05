import { HttpClient, HttpHeaders} from '@angular/common/http';
import { config } from '../service-config/service-config'
import { Injectable } from '@angular/core';

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
  apiUrl: string;
 
  constructor(public http: HttpClient) {
    this.apiUrl = config.url;
  }

  public login(credentials) {
    // credentials.email="testing@test.com";
    // credentials.password="Abcd*1234";
    var data = "username=" + credentials.email + "&password=" + credentials.password + "&grant_type=password";
   
    const header: HttpHeaders = new HttpHeaders();
    header.append('Content-Type', 'application/x-www-urlencoded');
    header.append('No-Auth', 'True');
    const httpOptions = {
      headers: header
    };
     var authUrl  = this.apiUrl + 'Token';
    return this.http.post(authUrl, data, httpOptions); 
  }

 public getUserInfo() : User {
    return this.currentUser;
  }
 
  public logout() {
    localStorage.removeItem('userToken');
    // this.router.navigate(['/login']);
  }
}
