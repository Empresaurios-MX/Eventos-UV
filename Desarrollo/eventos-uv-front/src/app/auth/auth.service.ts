import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() { }

  public isAuthenticatedStudent(): boolean{
    if(localStorage.getItem('estudiante')){
      return true;
    } else {
      return false;
    }
  }

  public isAuthenticatedAdmin(): boolean{
    if(localStorage.getItem('admin')){
      return true;
    } else {
      return false;
    }
  }
}
