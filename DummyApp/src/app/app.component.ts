
import { AuthService } from './services/auth.service';
import { Component, Input, OnDestroy, OnInit, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy, OnInit {
  mostraUtente;

// DENTRO SUBSCRIPTION SI METTONO LE SOTTOSCRIZIONI, L'UTILITA E' LA FUNZIONE UNSUBSCRIBE CHE CI E' UTILE
// PER CESSARE LE SOTTOSCRIZIONI QUANDO E' NECESSARIO (EVITARE ERRRORI, CONFLITTI ECC)
  subscription: Subscription;
  routerSubscription: Subscription;
  title = 'DummyApp';
  autorizzato;

  constructor(private servizioAcc: AuthService, private router: Router) {
    this.routerSubscription = router.events.subscribe((event) => {
      // if (event instanceof NavigationStart) {
      //   const browserRefresh = !router.navigated;
      //   console.log('Refreshato');
      //   if (!browserRefresh){
      //     this.mostraUtente = JSON.parse(sessionStorage.getItem('isLogged'));
      //   }
      // }
    });
  }

  ngOnInit() {
    this.subscription = this.servizioAcc
      .getUserAuth()
      .subscribe(userAuth => {
        console.log('triggherato il subject: ', userAuth);
        this.autorizzato = userAuth.autenticato;
        console.log('controllo un attimo: ', userAuth.autenticato);
        userAuth.autenticato ? this.mostraUtente = {...userAuth.user} : null;
      });
    if (sessionStorage.getItem('isLogged')) {
        this.autorizzato = true;
        console.log(sessionStorage.getItem('isLogged') + 'sono in app');
        this.mostraUtente = JSON.parse(sessionStorage.getItem('isLogged'));
      } else {
        this.autorizzato = false;
      }

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.routerSubscription.unsubscribe();
  }
}

// export class AppComponent implements OnDestroy,OnInit {

//   subscription: Subscription;
//   title = 'DummyApp';
//   autorizzato = false;
//   constructor(private servizioAcc: AuthService) {

//   }

//   ngOnInit() {
//     this.subscription = this.servizioAcc.getBoolean().subscribe(autorizzazione => {
//       this.autorizzato = autorizzazione;
//       alert(this.autorizzato + 'ao so er appcomp');
//     });
//   }

//   ngOnDestroy() {
//     // unsubscribe to ensure no memory leaks
//     this.subscription.unsubscribe();
// }

// }
