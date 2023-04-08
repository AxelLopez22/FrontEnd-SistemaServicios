import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  UrlBase: string = "https://localhost:7128/api/Usuario/";
  constructor(private http: HttpClient) { }

  login(user: User){
    return this.http.post(this.UrlBase + 'login', user);
  }
}
