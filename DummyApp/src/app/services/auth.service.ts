import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  accesso = false;

  constructor() { }

  getAccess() {
  this.accesso = !this.accesso;
  }

}
