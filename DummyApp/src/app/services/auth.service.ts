import { NavigationService } from './navigation.service';
import { element } from 'protractor';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { SignUpForm } from '../views/auth/signup/signup.component';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInStatus = sessionStorage.getItem('isLogged') || '';
  appoggio;
  listaUtenti: any;
  subject = new Subject<boolean>();
  constructor(private httpClient: HttpClient, private navigation: NavigationService) {}

  getRegistered(nuovoUtente: SignUpForm) {
    this.subject.next(true);
  }

  getAccess(username: string, pass: string) {
    this.httpClient.get('http://localhost:3000/Utenti').subscribe(listaUte => {
      this.listaUtenti = listaUte;
      this.listaUtenti.forEach(el => {
        if (el.login === username && el.password === pass) {
          sessionStorage.setItem('isLogged', JSON.stringify(el));
          this.navigation.goToLibreria();
          this.subject.next(true);
        }
      });
    });
  }
  Logout() {
    sessionStorage.setItem('isLogged', '');
    this.subject.next(false);
    this.navigation.goToLogin();
  }

  getBoolean(): Observable<any> {
    return this.subject.asObservable();
  }
}

// export class AuthService {
//   private loggedInStatus = JSON.parse(sessionStorage.getItem('isLogged') || 'false');

//   listaUtenti: any;

//   subject = new Subject<boolean>();
//   constructor(private httpClient: HttpClient) {}

//   getRegistered(nuovoUtente: SignUpForm) {
//     sessionStorage.setItem('isLogged', 'true');
//     this.subject.next(true);
//   }

//   getAccess(username: string, pass: string){
//     this.httpClient.get('http://localhost:3000/Utenti').subscribe(listaUte => {
//       this.listaUtenti = listaUte;
//       this.listaUtenti.forEach(el => {
//         if (el.login === username && el.password === pass) {
//           sessionStorage.setItem('isLogged', 'true');
//           this.subject.next(JSON.parse(sessionStorage.getItem('isLogged') || this.loggedInStatus.toString()));
//           alert('logg' + JSON.parse(sessionStorage.getItem('isLogged') || this.loggedInStatus.toString()));
//           // sessionStorage.setItem('isLogged', 'true');
//           // console.log(this.loggedInStatus);

//         }
//       });
//     });
//   }

//   Logout() {
//     sessionStorage.setItem('isLogged', 'false');
//     this.subject.next(JSON.parse(sessionStorage.getItem('isLogged') || this.loggedInStatus.toString()));
//     // sessionStorage.setItem('isLogged', 'false');
//   }

//   getBoolean(): Observable<any> {
//     alert('getbol' + JSON.parse(sessionStorage.getItem('isLogged') || this.loggedInStatus.toString()));
//     return this.subject.asObservable();
// }
// }
