import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { SignUpForm } from '../views/auth/signup/signup.component';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInStatus = JSON.parse(sessionStorage.getItem('isLogged') || 'false');
  listaUtenti: any;

  subject = new Subject<boolean>();
  constructor(private httpClient: HttpClient) {}

  getRegistered(nuovoUtente: SignUpForm) {
    this.subject.next(true);
  }

  getAccess(username: string, pass: string){
    this.httpClient.get('http://localhost:3000/Utenti').subscribe(listaUte => {
      this.listaUtenti = listaUte;
      this.listaUtenti.forEach(el => {
        if (el.login === username && el.password === pass) {
          this.subject.next(true);
          sessionStorage.setItem('isLogged', 'true');
          console.log(this.loggedInStatus);

        }
      });
    });
  }

  Logout() {
    this.subject.next(false);
    sessionStorage.setItem('isLogged', 'false');
  }

  getBoolean(): Observable<any> {
    return this.subject.asObservable();
}
}
