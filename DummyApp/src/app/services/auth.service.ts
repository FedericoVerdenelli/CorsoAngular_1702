import { NavigationService } from './navigation.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { SignUpForm } from '../views/auth/signup/signup.component';



// USER AUTH E' UNA CLASSE CHE CONTIENE UNA BOOLEANA E UNA VARIABILE USER CHE POTREBBE L'OGGETTO UTENTE
class UserAuth  {
  autenticato: boolean;
  user: any;

// L'OPERATORE '?' DENTRO A UN COSTRUTTORE FUNGE DA OVERLOAD, CIO' SIGNIFICA CHE IL COSTRUTTORE POTRA' CONTERENE
// O NON CONTENERE LA VARIABILE AL QUALE E' ASSEGNATO MA PER EVITARE PROBLEMI VA CONTROLLATO CON UNA IF
// L'OPERATORE '?' SI USA ANCHE COME SHORTCUT DI IF ELSE

  constructor(autenticato, user?) {
    this.autenticato = autenticato;
    user ? this.user = user : null;
// LETTERELAMENTE USER E' VERO?(SARA' VERO SE E' STATO POPOLATO NEI PARAMETRI), SE TRUE ASSEGNA A USER IL PARAMETRO
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  boolenaAuth = false;
  booleanaRegistr = true;
  private loggedInStatus = sessionStorage.getItem('isLogged') || '';
  listaUtenti: any;
  subject = new Subject<UserAuth>();
  constructor(private httpClient: HttpClient, private navigation: NavigationService) {}

// SIGN UP PRENDERA' COME PARAMETRO UN OGGETTO PRECOMPILATO DI TIPO signUpForm
// SUBJECT RICOPRE IL RUOLO PRINCIPALE NEL TENERE IN VITA UNA SESSIONE DI LOGIN, SUBJECT E' UN OBSERVABLE, IL METODO
// NEXT MANDA UN MESSAGGIO ALL'OBSERVABLE, SUBJECT INVIA IL MESSAGGIO A TUTTI I SUBSCRIBERS
// IN QUESTO SERVIZIO E' INIETTATO IL SERVIZIO NAVIGATION CHE CONTIENE LE ROTTE RAGGIUNGIBILI TRAMIT TYPESCRIPT
// CONST RENDE COSTANTE L'INDIRIZZO DI MEMORIA DI RIFERIMENTO, IL CONTENUTO DELLA CELLA DI MEMORIA PUO' CAMBIARE
  signUp(nuovoUtente: SignUpForm) {
    this.booleanaRegistr = true;
    this.httpClient.get('http://localhost:3000/Utenti').subscribe(listaUte => {
      this.listaUtenti = listaUte;
      this.listaUtenti.forEach(el => {
        if (el.login === nuovoUtente.login) {
          this.booleanaRegistr = false;
          const userAuth = new UserAuth(false);
          this.subject.next(userAuth);
        }

      });
      if (this.booleanaRegistr){
        const userAuth = new UserAuth( true, nuovoUtente);
        sessionStorage.setItem('isLogged', JSON.stringify(nuovoUtente));
        this.subject.next(userAuth);
        this.httpClient.post('http://localhost:3000/Utenti', nuovoUtente).subscribe();
        this.navigation.goToLibreria();
      }
    });

  }

  // SESSION STORAGE E' UNA MEMORIA PRESTABILITA DAL BROWSER DI 10 MEGA, IL SUO UTILIZZO ESSENDO LA MEMORIA IRRISORIA
  // E' QUELLO DI SALVARCI DENTRO KEY VALUE SEMPLICI, CI TORNA QUINDI MOLTO UTILE PER SALVARCI I DATI DI ACCESSO CHE
  // POSSONO ESSERE VISIBILI E/O MANIPOLABILI E AFFINNI COME BOOLEANE ECC, NON BISOGNA SALVARCI DENTRO LE STRINGHE
  // DI PASSWORD IN QUANTO RISULTEREBBERO VISIBILI DALLA CONSOLE DEL BROWSER, SESSION STORAGE E' PER L'APPUNTO
  // CONSULTABILE.
  // SI USA STRINGIFY PERCHE' IL METODO setItem PRENDE COME PARAMETRO DUE STRINGHE
  login(username: string, pass: string) {
    this.httpClient.get('http://localhost:3000/Utenti').subscribe(listaUte => {
      this.listaUtenti = listaUte;
      this.listaUtenti.forEach(el => {
        if (el.login === username && el.password === pass) {
          sessionStorage.setItem('isLogged', JSON.stringify(el));
          const userAuth = new UserAuth(true, el);
          this.subject.next(userAuth);
          this.navigation.goToLibreria();
          this.boolenaAuth = true;
        }

      });
      if (!this.boolenaAuth) {
        const userAuth = new UserAuth(false);
        this.subject.next(userAuth);
      }
    });
  }
  // AL LOGOUT SESSION STORAGE VIENE SVUOTATO, USER AUTH.BOOLEANA SETTATO A FALSO E POI VIENE MANDATO L'AGGIORNAMENTO
  // AI SUBCRIBERS
  Logout() {
    sessionStorage.setItem('isLogged', '');
    const userAuth = new UserAuth(false);
    this.subject.next(userAuth);
    this.navigation.goToHome();
  }
  // QUESTO METODO VIENE CHIAMATO IN APP COMPONENT PER MOSTRARCI QUALI COMPONENTI POSSIAMO USARE NELLA NAVBAR
  getUserAuth(): Observable<any> {
    return this.subject.asObservable();
  }
  // QUESTO METODO SERVE DURANTE I LOGIN/REGISTRAZIONI PER CONTROLLARE SE SESSIONFACTORY E' STATO POPOLATO
  isEmpty(obj) {
    for(const key in obj) {
        if (obj.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
}
}
