import { element } from 'protractor';
import { AuthService } from './services/auth.service';
import { Component, Input, OnDestroy, OnInit, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy, OnInit, OnChanges {
  mostraUtente;
  subscription: Subscription;
  title = 'DummyApp';
  autorizzato;
  constructor(private servizioAcc: AuthService, private router: Router) {
    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        var browserRefresh = !router.navigated;
        if (!browserRefresh){
          this.mostraUtente = JSON.parse(sessionStorage.getItem('isLogged'));
        }
      }
    });
  }

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
  }

  ngOnInit() {
    this.subscription = this.servizioAcc
      .getBoolean()
      .subscribe(autorizzazione => {
        this.autorizzato = autorizzazione;
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
