import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {

  constructor() { }

  logout():void{
    localStorage.removeItem('user-info')
  }

  saveToken(token:string):void{
    localStorage.setItem('token', token)
  }

  isAuthenticated():boolean{
    // @ts-ignore
    return localStorage.getItem('token');
  }

  getUsernameAuthenticated():string{
    const user_info = JSON.parse( localStorage.getItem('user-info') || '{}' );
    return user_info;
  }


}
