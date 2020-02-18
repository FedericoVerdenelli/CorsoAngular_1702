import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';
@Injectable({
  providedIn: "root"
})
export class AuthService {
  id: number;
  nome: string;
  cognome: string;
  login: string;
  email: string;
  password: string;

  accesso = false;
  listaUtenti: any;

  subject = new Subject<boolean>();
  constructor(private httpClient: HttpClient) {}

  Registration() {}

  getAccess(username: string, pass: string): boolean {
    this.httpClient.get("http://localhost:3000/Utenti").subscribe(listaUte => {
      this.listaUtenti = listaUte;
      this.listaUtenti.forEach(el => {
        alert(el.id);
        if (el.login === username && el.password === pass) {
          alert("success");
        } else {
          alert("deny");
        }
      });
    });

    return false;
  }

  Logout() {}

  proceed() {
    this.accesso = !this.accesso;
  }
}
